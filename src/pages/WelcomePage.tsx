import { useAuth0 } from '@auth0/auth0-react'
import BaseButton from '../components/buttons/BaseButton.tsx'
import SignInButton from '../components/buttons/SignInButton.tsx'
import prewin from '../assets/prewinSaludando.png'
import { Navigate } from 'react-router-dom'
// import router from '../routes/router.tsx'

function WelcomePage() {
  const { isAuthenticated, isLoading } = useAuth0()
  if (isLoading) {
    return <div>{'Cargando ...'}</div>
  }
  if (isAuthenticated) {
    return <Navigate to="/home" replace />
  }
  return (
    <div
      className="
    relative
    bg-sky-50
    h-screen w-screen
    overflow-hidden
  "
    >
      <div className="absolute top-0 right-0 z-20">
        <SignInButton />
      </div>
      {/* CAPA 1: contenido centrado real */}
      <div
        className="
      absolute inset-0
      flex flex-col
      items-center justify-center
      gap-6
      z-10
      mb-48
    "
      >
        <h1
          className="
          text-center
          font-bold
          md:text-xl
          text-blue-900"
        >
          (FALTA EL LOGO!!!) ¡Bienvenido(a) a PreuIng!
        </h1>

        <div
          className="
          flex flex-col
          md:flex-row
          gap-4
          md:gap-24
          justify-center
          w-full
          items-center
          "
        >
          <BaseButton redirectTo="/staff/application">Postula al Equipo</BaseButton>
          <BaseButton redirectTo="/student/application">Postula como Estudiante</BaseButton>
        </div>
      </div>

      {/* CAPA 2: imagen fija abajo, recortada */}
      <div
        className="
      absolute bottom-0 left-1/2 -translate-x-1/2
      w-full
      flex justify-center
      z-0
      pointer-events-none
    "
      >
        <div className="h-[45vh] overflow-hidden">
          <img
            src={prewin}
            alt="Prewin Saludando"
            className="
            w-[85vw] max-w-130
            h-full
            object-cover object-top
          "
          />
        </div>
      </div>
    </div>
  )
}

export default WelcomePage
