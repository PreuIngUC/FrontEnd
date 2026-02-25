import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import type Permissions from '../constants/permissions.ts'

type Payload = { permissions?: Permissions[]; scope?: string }

function usePermissions() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0()
  const [permissions, setPermissions] = useState<Permissions[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    let cancelled = false
    void (async () => {
      setLoading(true)
      if (!isAuthenticated && !cancelled) {
        setPermissions([])
        setLoading(false)
        return
      }
      if (!isAuthenticated && cancelled) return
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        },
      })
      const payload = jwtDecode<Payload>(token)
      const perms = (payload.permissions ?? payload.scope?.split(' ') ?? []) as Permissions[]
      if (!cancelled) {
        setPermissions(perms)
        setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [isAuthenticated, getAccessTokenSilently])

  return { permissions, loading }
}

export default usePermissions
