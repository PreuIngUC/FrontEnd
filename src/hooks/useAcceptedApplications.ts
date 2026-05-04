import { useCallback, useEffect, useState } from 'react'
import { useApi } from '../wrappers/ApiProvider.tsx'
import BackendApi, { type PluralKind } from '../api/BackendApi.ts'

export default function useAcceptedApplications<R extends PluralKind>({ of }: { of: R }) {
  const [users, setUsers] = useState<
    Awaited<ReturnType<typeof BackendApi.prototype.getAcceptedApplications<R>>>['data']['users']
  >([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | undefined>(undefined)
  const api = useApi()
  useEffect(() => {
    let ignore = false
    void (async () => {
      if (!api) return
      if (!of) return
      try {
        const res = await api.getAcceptedApplications({ of })
        if (!ignore) setUsers(res.data.users)
      } catch {
        if (!ignore) {
          setError('Hubo un error obteniendo a los usuarios.')
          setUsers([])
        }
      } finally {
        if (!ignore) setLoading(false)
      }
    })()
    return () => {
      ignore = true
    }
  }, [api, of])
  const refetch = useCallback(async () => {
    if (!api || !of) return
    setLoading(true)
    setError(undefined)
    try {
      const res = await api.getAcceptedApplications({ of })
      setUsers(res.data.users)
    } catch {
      setError('Hubo un error obteniendo a los usuarios.')
      setUsers([])
    } finally {
      setLoading(false)
    }
  }, [api, of])
  return { users, loading, error, refetch }
}
