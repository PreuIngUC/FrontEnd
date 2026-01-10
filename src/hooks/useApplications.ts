import { useEffect, useState } from 'react'
import { useApi } from '../wrappers/ApiProvider.tsx'

interface UseApplicationsProps {
  type: 'staff' | 'students'
}
export interface User {
  id: string
  names: string
  lastName0: string
  lastName1: string
  staffProfile?: {
    applicationState: 'PENDING_AS_STAFF' | 'ACCEPTED_AS_STAFF'
  }
  studentProfile?: {
    applicationState: 'PENDING_AS_STUDENT' | 'ACCEPTED_AS_STUDENT'
  }
}
interface UseApplicationsReturn {
  users: User[]
  loading: boolean
  error?: string
}
export default function useApplications({ type }: UseApplicationsProps): UseApplicationsReturn {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | undefined>(undefined)
  const api = useApi()
  useEffect(() => {
    if (!api) return
    void (async () => {
      try {
        const data = (await api.getApplications(type)).data as { users: User[] }
        setUsers(data.users)
        // console.log(data)
      } catch {
        setError('Error obteniendo usuarios.')
      } finally {
        setLoading(false)
      }
    })()
  }, [api])
  return { users, loading, error }
}
