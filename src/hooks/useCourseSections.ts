import { useCallback, useEffect, useState } from 'react'
import type BackendApi from '../api/BackendApi'
import { useApi } from '../wrappers/ApiProvider'

export default function useCourses({ id }: { id: string | undefined }) {
  const [sections, setSections] = useState<
    Awaited<ReturnType<typeof BackendApi.prototype.getCourseSections>>['data']['sections']
  >([])
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
        const data = (await api.getCourseSections({ id })).data
        if (!ignore) setSections(data.sections)
      } catch {
        if (!ignore) {
          setError('Error obteniendo datos.')
          setSections([])
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
      const data = (await api.getCourseSections({ id })).data
      setSections(data.sections)
    } catch {
      setError('Error obteniendo datos.')
      setSections([])
    } finally {
      setLoading(false)
    }
  }, [api, id])
  return { sections, loading, error, refetch }
}
