import { useEffect, useState } from 'react'
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
    if (!api) return
    if (!of) return
    setLoading(true)
    void (async () => {
      try {
        const data = (await api.getApplications<R>({ of })).data
        setUsers(data.users)
      } catch {
        setError('Error obteniendo usuarios.')
      } finally {
        setLoading(false)
      }
    })()
  }, [api, of])
  return { users, loading, error }
}
