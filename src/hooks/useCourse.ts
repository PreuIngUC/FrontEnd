import { useCallback, useEffect, useState } from 'react'
import { useApi } from '../wrappers/ApiProvider.tsx'
import type BackendApi from '../api/BackendApi.ts'

export default function useCourse({ id }: { id: string | undefined }) {
  const [course, setCourse] = useState<
    Awaited<ReturnType<typeof BackendApi.prototype.getCourse>>['data'] | null
  >(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | undefined>(undefined)
  const api = useApi()
  useEffect(() => {
    let ignore = false
    void (async () => {
      if (!api) return
      if (!id) return
      setLoading(true)
      setError(undefined)
      try {
        const data = (await api.getCourse(id)).data
        if (!ignore) setCourse(data)
      } catch {
        if (!ignore) {
          setError('Error obteniendo datos.')
          setCourse(null)
        }
      } finally {
        if (!ignore) setLoading(false)
      }
    })()
    return () => {
      ignore = true
    }
  }, [api, id])
  const refetch = useCallback(async () => {
    if (!api) return
    if (!id) return
    setLoading(true)
    setError(undefined)
    try {
      const data = (await api.getCourse(id)).data
      setCourse(data)
    } catch {
      setError('Error obteniendo datos.')
      setCourse(null)
    } finally {
      setLoading(false)
    }
  }, [api, id])
  return { course, loading, error, refetch }
}
