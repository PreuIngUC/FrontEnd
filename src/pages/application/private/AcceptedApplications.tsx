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
    while ((await api.jobStep({ of, params: { jobId } })).data.stepsAvailable) {
      await sleep(500)
      await refetch()
      await sleep(500)
    }
    setCreating(false)
    await refetch()
  }

  return (
    <>
      {creating && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-900/60 backdrop-blur-sm transition-opacity">
          <div className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col items-center max-w-sm text-center animate-in fade-in zoom-in duration-200">
            {/* Spinner animado usando SVG */}
            <svg
              className="animate-spin -ml-1 mr-3 h-12 w-12 text-blue-600 mb-4"
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
            <h3 className="text-xl font-bold text-blue-900 mb-2">Creando Cuentas...</h3>
            <p className="text-sm text-slate-600">
              Por favor, no cierres ni actualices esta página. Este proceso puede tomar unos
              momentos.
            </p>
          </div>
        </div>
      )}
      <main className="min-h-screen bg-sky-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-sky-100 p-6 md:p-8">
          {/* Cabecera y Acción Principal */}
          <div className="mb-8 border-b border-sky-100 pb-4 flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-blue-900 tracking-tight">
                Postulaciones Aceptadas
              </h1>
              <p className="mt-2 text-slate-600">
                Revisa la lista y genera las cuentas correspondientes.
              </p>
            </div>

            <button
              className={`inline-flex items-center justify-center px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 shadow-sm whitespace-nowrap ${
                creating
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                  : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow border border-transparent focus:ring-2 focus:ring-blue-500 focus:ring-offset-1'
              }`}
              onClick={onCreateAccounts}
              disabled={creating}
            >
              {creating ? 'Creando cuentas...' : 'Crear Cuentas'}
            </button>
          </div>

          {/* Contenedor de la Tabla */}
          <div className="overflow-x-auto rounded-xl border border-sky-100 shadow-sm">
            <table className="w-full border-collapse text-left">
              <thead className="bg-sky-50 border-b border-sky-100">
                <tr>
                  <th className="py-3 px-4 font-semibold text-blue-900 text-sm">Nombre Completo</th>
                  <th className="py-3 px-4 font-semibold text-blue-900 text-sm text-right">
                    Acción
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sky-50">
                {users.map(u => (
                  <tr
                    key={u.id}
                    className="transition-colors hover:bg-blue-50/50 even:bg-slate-50 odd:bg-white"
                  >
                    <td className="py-3 px-4 text-slate-700 font-medium">
                      {u.lastName0} {u.lastName1} {u.names}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        className="inline-flex items-center px-3 py-1 bg-white border border-sky-200 text-blue-700 text-sm font-medium rounded-lg hover:bg-sky-50 hover:border-sky-300 transition-colors shadow-sm"
                        onClick={() =>
                          navigate(`/${of === 'staff' ? of : 'student'}/read-application/${u.id}`)
                        }
                      >
                        Revisar
                      </button>
                    </td>
                  </tr>
                ))}

                {/* Estados de carga, error y vacío */}
                {loading && (
                  <tr>
                    <td colSpan={2} className="py-8 text-center text-slate-500 animate-pulse">
                      Cargando postulaciones...
                    </td>
                  </tr>
                )}
                {error && (
                  <tr>
                    <td colSpan={2} className="py-8 text-center text-red-500 font-medium bg-red-50">
                      Ocurrió un error: {error}
                    </td>
                  </tr>
                )}
                {!loading && !error && users.length === 0 && (
                  <tr>
                    <td colSpan={2} className="py-12 text-center text-slate-500">
                      <p className="text-lg font-medium text-slate-600 mb-1">Sin resultados</p>
                      <p className="text-sm">No hay postulaciones en esta pestaña.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  )
}
