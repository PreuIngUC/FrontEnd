import { useAuth0 } from '@auth0/auth0-react'
function SignInButton() {
  const { loginWithRedirect } = useAuth0()
  return (
    <button
      onClick={() => loginWithRedirect()}
      className="
      bg-sky-300/0
      text-blue-900
      hover:bg-blue-900
      hover:text-sky-300
      p-2
      transition
      font-bold
      md:text-xl
    "
    >
      Ingresar
    </button>
  )
}

export default SignInButton
