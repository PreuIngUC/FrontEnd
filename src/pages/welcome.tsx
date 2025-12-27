import { useAuth0 } from '@auth0/auth0-react'
import BaseButton from '../components/BaseButton'
import prewin from '../assets/prewinSaludando.png'

function WelcomePage() {
  const { isAuthenticated, isLoading } = useAuth0()
  if (isLoading) {
    return <div>{'Cargando ...'}</div>
  }
  if (isAuthenticated) {
    return <div>{'Aquí ira la HomePage'}</div>
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
      text-blue-900"
        >
          ¡Bienvenido(a) a PreuIng!
        </h1>

        <div
          className="
      flex flex-col
      md:flex-row
      gap-4
      md:gap-24
      justify-center
      w-full
      "
        >
          <BaseButton>Postula al Equipo</BaseButton>
          <BaseButton>Postula como Estudiante</BaseButton>
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
