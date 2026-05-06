import { useCallback, useEffect, useState } from 'react'
import type BackendApi from '../api/BackendApi'
import { useApi } from '../wrappers/ApiProvider'

export default function useCourses() {
  const [courses, setCourses] = useState<
    Awaited<ReturnType<typeof BackendApi.prototype.getCourses>>['data']['courses']
  >([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | undefined>(undefined)
  const api = useApi()
  useEffect(() => {
    let ignore = false
    void (async () => {
      if (!api) return
      setLoading(true)
      setError(undefined)
      try {
        const data = (await api.getCourses()).data
        if (!ignore) setCourses(data.courses)
      } catch {
        if (!ignore) {
          setError('Error obteniendo datos.')
          setCourses([])
        }
      } finally {
        if (!ignore) setLoading(false)
      }
    })()
    return () => {
      ignore = true
    }
  }, [api])
  const refetch = useCallback(async () => {
    if (!api) return
    setLoading(true)
    setError(undefined)
    try {
      const data = (await api.getCourses()).data
      setCourses(data.courses)
    } catch {
      setError('Error obteniendo datos.')
      setCourses([])
    } finally {
      setLoading(false)
    }
  }, [api])
  return { courses, loading, error, refetch }
}
