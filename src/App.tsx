// import { useAuth0 } from '@auth0/auth0-react'
// import LoginButton from './components/LoginButton'
// import LogoutButton from './components/LogoutButton'
// import Profile from './components/Profile'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <main>
      <Outlet />
    </main>
  )
}

export default App
