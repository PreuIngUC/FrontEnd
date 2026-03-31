import { useState } from 'react'
import { useApi } from '../../../wrappers/ApiProvider.tsx'

export default function VerifyThenPassword() {
  const [rut, setRut] = useState<string>('')
  const [waiting, setWaiting] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const api = useApi()

  if (!api) {
    return (
      <div className="min-h-screen bg-sky-50 flex items-center justify-center">
        <div className="text-slate-500 animate-pulse font-medium">Cargando entorno...</div>
      </div>
    )
  }

  const handleSubmit = async () => {
    // Evitar llamadas innecesarias si el input está vacío
    if (!rut.trim()) return

    setWaiting(true)
    try {
      await api.verifyThenChangePassword({ rut })
      setSuccess(true)
    } catch (error) {
      console.error('Error al verificar el RUT:', error)
      // Aquí idealmente deberías setear un estado de error para mostrar en la UI,
      // por ahora lo dejo como un alert simple para que no pase desapercibido.
      alert('Ocurrió un error al procesar tu solicitud. Intenta nuevamente.')
    } finally {
      setWaiting(false)
      setRut('')
    }
  }

  return (
    <main className="min-h-screen bg-sky-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-sky-100 p-8 text-center transition-all duration-300">
        {success ? (
          /* Vista de Éxito */
          <div className="animate-in fade-in zoom-in duration-300">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-50 mb-6 border border-green-100">
              <svg
                className="h-8 w-8 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-extrabold text-blue-900 tracking-tight mb-2">¡Listo!</h2>
            <p className="text-slate-600">Muchas gracias, ya puedes cerrar esta pestaña.</p>
          </div>
        ) : (
          /* Formulario */
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-2xl font-extrabold text-blue-900 tracking-tight mb-2">
                Verificación de Identidad
              </h1>
              <p className="text-slate-600 text-sm">
                Para terminar con la verificación, ingresa tu RUT.
              </p>
            </div>

            <div className="text-left">
              <input
                type="text"
                placeholder="Ej: 12345678-9"
                value={rut}
                onChange={e => setRut(e.target.value)}
                disabled={waiting}
                className="w-full px-4 py-3 bg-white border border-sky-200 rounded-xl shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:border-sky-500 focus:ring-sky-200 text-slate-700 placeholder-slate-400 disabled:opacity-60 disabled:bg-slate-50"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={waiting || !rut.trim()}
              className={`relative flex items-center justify-center w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 shadow-sm ${
                waiting || !rut.trim()
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                  : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow border border-transparent focus:ring-2 focus:ring-blue-500 focus:ring-offset-1'
              }`}
            >
              {waiting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-5 w-5 text-slate-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Verificando...
                </>
              ) : (
                'Enviar'
              )}
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
