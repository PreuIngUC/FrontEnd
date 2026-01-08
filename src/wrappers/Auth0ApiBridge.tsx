import { useEffect, type PropsWithChildren } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import BackendApi from '../api/BackendApi.ts'

function Auth0ApiBridge({ children }: PropsWithChildren) {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0()

  useEffect(() => {
    const api = BackendApi.getInstance()

    api.setTokenGetter(async (opts?: { force?: boolean }) => {
      if (!isAuthenticated) throw new Error('Not authenticated')

      return getAccessTokenSilently({
        authorizationParams: { audience: import.meta.env.VITE_AUTH0_AUDIENCE },
        cacheMode: opts?.force ? 'off' : 'on',
      })
    })
  }, [isAuthenticated, getAccessTokenSilently])

  return <>{children}</>
}

export default Auth0ApiBridge
