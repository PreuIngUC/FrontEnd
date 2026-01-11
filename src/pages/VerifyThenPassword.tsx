import { useState } from 'react'
import { useApi } from '../wrappers/ApiProvider.tsx'

export default function VerifyThenPassword() {
  const [rut, setRut] = useState<string>('')
  const api = useApi()

  if (!api) return <div>Cargando...</div>

  const handleSubmit = async () => {
    await api.verifyThenChangePassword({ rut })
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm flex flex-col gap-4 text-center">
        <h1 className="text-lg font-semibold">Para terminar con la verificación ingresa tu RUT</h1>

        <input
          type="text"
          placeholder="Ej: 12345678-9"
          value={rut}
          onChange={e => setRut(e.target.value)}
          className="border rounded px-3 py-2 focus:outline-none focus:ring"
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Enviar
        </button>
      </div>
    </div>
  )
}
