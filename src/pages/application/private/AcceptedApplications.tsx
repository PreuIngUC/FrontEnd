import useAcceptedApplications from '../../../hooks/useAcceptedApplications.ts'
import { useApi } from '../../../wrappers/ApiProvider.tsx'
import { useState } from 'react'
import type { PluralKind } from '../../../api/BackendApi.ts'
import UsersTable from '../../../components/UsersTable.tsx'
import HeadAndAction from '../../../components/HeadAndAction.tsx'
import ProgressBar from '../../../components/ProgressBar.tsx'

export default function AcceptedApplications<T extends PluralKind>({ of }: { of: T }) {
  const { users, loading, error, refetch } = useAcceptedApplications({ of })
  const api = useApi()
  const [creating, setCreating] = useState<boolean>(false)
  const [successfulItems, setSuccessfulItems] = useState<number>(0)
  const [errorItems, setErrorItems] = useState<number>(0)
  const [initialAmount, setInitialAmount] = useState<number>(users.length)

  const onCreateAccounts = async () => {
    if (!api) return
    if (creating) return
    if (users.length <= 0) return
    setCreating(true)
    setInitialAmount(users.length)
    const { jobId } = (await api.createJob({ of })).data
    const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))
    let jobInfo = (await api.jobStep({ of, params: { jobId } })).data
    setSuccessfulItems(jobInfo.created)
    setErrorItems(jobInfo.haveErrors)
    while (jobInfo.stepsAvailable) {
      await sleep(500)
      await refetch()
      await sleep(500)
      jobInfo = (await api.jobStep({ of, params: { jobId } })).data
      setSuccessfulItems(jobInfo.created)
      setErrorItems(jobInfo.haveErrors)
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
            <ProgressBar
              successfulItems={successfulItems}
              errorItems={errorItems}
              totalItems={initialAmount}
            />
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
          <HeadAndAction
            title="Postulaciones Aceptadas"
            paragraph="Revisa la lista y genera las cuentas"
            extra={
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
            }
          />
          {/* Contenedor de la Tabla */}
          <UsersTable
            users={users}
            loading={loading}
            error={error}
            redirectsTo={of === 'staff' ? '/staff/read-application/' : '/student/read-application/'}
          />
        </div>
      </main>
    </>
  )
}
