import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react'

function HomePage() {
  const { isAuthenticated, isLoading, user } = useAuth0()
  return (
    <div>
      <p>Bienvenido(a)!!!</p>
    </div>
  )
}

export default HomePage
