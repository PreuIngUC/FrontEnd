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
  const fetch = useCallback(async () => {
    if (!api) return
    if (!of) return
    setLoading(true)
    setError(undefined)
    try {
      const data = (await api.getAcceptedApplications<R>({ of })).data
      setUsers(data.users)
    } catch {
      setError('Error obteniendo usuarios.')
      setUsers([])
    } finally {
      setLoading(false)
    }
  }, [api, of])
  const refetch = useCallback(async () => {
    await fetch()
  }, [fetch])
  useEffect(() => {
    void fetch()
  }, [fetch])
  return { users, loading, error, refetch }
}
