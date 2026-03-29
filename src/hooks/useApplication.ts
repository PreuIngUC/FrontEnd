import { useCallback, useEffect, useState } from 'react'
import { useApi } from '../wrappers/ApiProvider.tsx'
import type { SingularKind } from '../api/BackendApi.ts'
import type BackendApi from '../api/BackendApi.ts'

export default function useApplication<R extends SingularKind>({
  of,
  id,
}: {
  of: R
  id: string | undefined
}) {
  const [user, setUser] = useState<
    Awaited<ReturnType<typeof BackendApi.prototype.getApplication<R>>>['data']['user'] | null
  >(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | undefined>(undefined)
  const [mutating, setMutating] = useState<boolean>(false)
  const api = useApi()
  const fetch = useCallback(async () => {
    if (!api) return
    if (!id) return
    if (!of) return
    setLoading(true)
    setError(undefined)
    try {
      const data = (await api.getApplication<R>({ of, params: { id } })).data
      setUser(data.user)
    } catch {
      setError('Error obteniendo datos.')
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [api, of, id])
  const refetch = useCallback(async () => {
    setMutating(true)
    try {
      await fetch()
    } finally {
      setMutating(false)
    }
  }, [fetch])
  useEffect(() => {
    void fetch()
  }, [fetch])
  return { user, loading, error, mutating, refetch }
}
