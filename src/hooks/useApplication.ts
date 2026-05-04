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
  const api = useApi()
  useEffect(() => {
    let ignore = false
    void (async () => {
      if (!api) return
      if (!of) return
      if (!id) return
      setLoading(true)
      setError(undefined)
      try {
        const data = (await api.getApplication<R>({ of, params: { id } })).data
        if (!ignore) setUser(data.user)
      } catch {
        if (!ignore) {
          setError('Error obteniendo datos.')
          setUser(null)
        }
      } finally {
        if (!ignore) setLoading(false)
      }
    })()
    return () => {
      ignore = true
    }
  }, [api, of, id])
  const refetch = useCallback(async () => {
    if (!api) return
    if (!of) return
    if (!id) return
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
  return { user, loading, error, refetch }
}
