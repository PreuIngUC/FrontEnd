import { useNavigate } from 'react-router-dom'
import useAcceptedApplications from '../../../hooks/useAcceptedApplications.ts'
import { useApi } from '../../../wrappers/ApiProvider.tsx'
import { useState } from 'react'
import type { PluralKind } from '../../../api/BackendApi.ts'

export default function AcceptedApplications<T extends PluralKind>({ of }: { of: T }) {
  const { users, loading, error, refetch } = useAcceptedApplications({ of })
  const api = useApi()
  const [creating, setCreating] = useState<boolean>(false)
  const navigate = useNavigate()

  const onCreateAccounts = async () => {
    if (!api) return
    if (creating) return
    setCreating(true)
    const { jobId } = (await api.createJob({ of })).data
    const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))
    while ((await api.jobStep({ of: 'staff', params: { jobId } })).data.stepsAvailable) {
      await sleep(150)
      await refetch()
      await sleep(150)
    }
    setCreating(false)
    await refetch()
  }

  return (
    <main className="p-6">
      <h1 className="text-xl font-semibold mb-4">Postulaciones</h1>
      <button
        className={`px-4 py-2 border ${
          creating ? 'font-semibold border-black' : 'border-gray-300'
        }`}
        onClick={onCreateAccounts}
      >
        Crear Cuentas
      </button>

      {/* Tabla */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">Nombre</th>
            <th className="text-left py-2">Acción</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, index) => (
            <tr key={index} className="border-b">
              <td className="py-2">
                {u.lastName0} {u.lastName1} {u.names}
              </td>
              <td className="py-2">
                <button
                  className="underline"
                  onClick={() =>
                    navigate(`/${of === 'staff' ? of : 'student'}/read-application/${u.id}`)
                  }
                >
                  Revisar
                </button>
              </td>
            </tr>
          ))}
          {loading && (
            <tr>
              <td colSpan={2} className="py-4 text-gray-500">
                Cargando...
              </td>
            </tr>
          )}
          {error && (
            <tr>
              <td colSpan={2} className="py-4 text-gray-500">
                Ocurrió un Error
              </td>
            </tr>
          )}
          {!loading && !error && users.length === 0 && (
            <tr>
              <td colSpan={2} className="py-4 text-gray-500">
                No hay postulaciones en esta pestaña.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </main>
  )
}
