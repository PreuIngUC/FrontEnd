// import { useAuth0 } from '@auth0/auth0-react'
// import LoginButton from './components/LoginButton'
// import LogoutButton from './components/LogoutButton'
// import Profile from './components/Profile'
import { Outlet } from 'react-router-dom'
import Auth0ApiBridge from './wrappers/Auth0ApiBridge.tsx'
import { ApiProvider } from './wrappers/ApiProvider.tsx'

function App() {
  return (
    <Auth0ApiBridge>
      <ApiProvider>
        <main>
          <Outlet />
        </main>
      </ApiProvider>
    </Auth0ApiBridge>
  )
}

export default App
