import { useAuth0 } from '@auth0/auth0-react'
import '../styles/welcome.css'
import prewin from '../assets/prewinSaludando.png'
import background from '../assets/fondoWelcome.png'

function WelcomePage() {
  const { isAuthenticated, isLoading } = useAuth0()

  if (isLoading) {
    return <div>{'Cargando ...'}</div>
  }
  if (isAuthenticated) {
    return <div>{'Aquí ira la HomePage'}</div>
  }
  return (
    <div className="welcome-wrapper">
      <h1 className="welcome-header">{'¡Bienvenido(a) a Adsum!'}</h1>
      <p className="welcome-p">{'Una app de PreuIngUC para pasar asistencia eficientemente'}</p>
      <img src={prewin} alt="Prewin Saludando" className="prewin" />
      <img src={background} alt="Fondo" className="welcome-background" />
    </div>
  )
}

export default WelcomePage
