import { useEffect, useState, useCallback } from 'react'
import { useApi } from '../wrappers/ApiProvider.tsx'
import BackendApi, { type PluralKind } from '../api/BackendApi.ts'

export default function useApplications<R extends PluralKind>({ of }: { of: R }) {
  const [users, setUsers] = useState<
    Awaited<ReturnType<typeof BackendApi.prototype.getApplications<R>>>['data']['users']
  >([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | undefined>(undefined)
  const api = useApi()
  useEffect(() => {
    let ignore = false
    void (async () => {
      if (!api) return
      if (!of) return
      setLoading(true)
      setError(undefined)
      try {
        const data = (await api.getApplications<R>({ of })).data
        if (!ignore) setUsers(data.users)
      } catch {
        if (!ignore) {
          setError('Error obteniendo usuarios.')
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
    if (!api) return
    if (!of) return
    setLoading(true)
    setError(undefined)
    try {
      const data = (await api.getApplications<R>({ of })).data
      setUsers(data.users)
    } catch {
      setError('Error obteniendo datos.')
      setUsers([])
    } finally {
      setLoading(false)
    }
  }, [api, of])
  return { users, loading, error, refetch }
}
