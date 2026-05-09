import { useState, useMemo } from 'react'
import UsersTable from '../../../components/UsersTable.tsx'
import HeadAndAction from '../../../components/HeadAndAction.tsx'
import { useApi } from '../../../wrappers/ApiProvider.tsx'
import useApplications from '../../../hooks/useApplications.ts'
import ProgressBar from '../../../components/ProgressBar.tsx'
import usePermissions from '../../../hooks/usePermissions.ts'
import Permissions from '../../../constants/permissions.ts'

interface User {
  id: string
  rut: string
  names: string
  lastName0: string
  lastName1: string
  applicationState: 'PENDING' | 'ACCEPTED' | 'REJECTED'
}

export default function ApplicationsRender({ of }: { of: 'staff' | 'students' }) {
  const { users, loading, error, refetch } = useApplications({ of })
  const [tab, setTab] = useState<User['applicationState']>('PENDING')
  const [search, setSearch] = useState<string>('')
  const [creating, setCreating] = useState(false)
  const [successfulItems, setSuccessfulItems] = useState<number>(0)
  const [errorItems, setErrorItems] = useState<number>(0)
  const [initialAmount, setInitialAmount] = useState<number>(users.length)

  const { permissions } = usePermissions()
  const api = useApi()

  const profile = of === 'staff' ? 'staffProfile' : 'studentProfile'

  const filteredByTab = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return users.filter(u => (u as any)[profile]?.applicationState?.startsWith(tab))
  }, [users, tab, profile])

  const filteredByTabAndSearch = useMemo(() => {
    if (search === '') return filteredByTab
    return filteredByTab.filter(
      u =>
        [u.names, u.lastName0, u.lastName1]
          .join(' ')
          .toLowerCase()
          .includes(search.toLowerCase()) || u.rut.includes(search),
    )
  }, [filteredByTab, search])

  const onCreateAccounts = async () => {
    if (!api) return
    if (creating) return
    if (filteredByTab.length <= 0) return
    setCreating(true)
    setInitialAmount(filteredByTab.length)
    const { jobId } = (await api.createJob({ of })).data
    const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))
    let jobInfo = (await api.jobStep({ of, params: { jobId } })).data
    setSuccessfulItems(successfulItems + jobInfo.created)
    setErrorItems(errorItems + jobInfo.haveErrors)
    while (jobInfo.stepsAvailable) {
      await sleep(500)
      await refetch()
      await sleep(500)
      jobInfo = (await api.jobStep({ of, params: { jobId } })).data
      setSuccessfulItems(successfulItems + jobInfo.created)
      setErrorItems(errorItems + jobInfo.haveErrors)
    }
    setCreating(false)
    await refetch()
  }

  return (
    <>
      {permissions.includes(
        of === 'staff' ? Permissions.CreateStaffUsers : Permissions.CreateStudentUsers,
      ) &&
        permissions.includes(Permissions.ReadJobsStatus) &&
        tab === 'ACCEPTED' &&
        creating && (
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
          {/* Cabecera */}
          <HeadAndAction
            title={'Postulaciones a ' + (of === 'staff' ? 'Equipo' : 'Estudiante')}
            paragraph="Revisa y gestiona las postulaciones de ingreso."
            extra={
              <>
                <div className="basis-full order-last mt-2 md:mt-4">
                  <p className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-sky-100 text-sky-800 border border-sky-200 shadow-sm transition-colors hover:bg-sky-200">
                    {users.length === 1 ? 'Existe' : 'Existen'}
                    <span className="font-bold text-blue-700 mx-1">{users.length}</span>{' '}
                    {users.length === 1 ? 'postulación' : 'postulaciones'} actualmente
                  </p>
                </div>
                {permissions.includes(
                  of === 'staff' ? Permissions.CreateStaffUsers : Permissions.CreateStudentUsers,
                ) &&
                  permissions.includes(Permissions.ReadJobsStatus) &&
                  tab === 'ACCEPTED' &&
                  filteredByTab.length > 0 && (
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
                  )}
              </>
            }
          />
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            {/* Selector de Estado (Tabs) */}
            <div className="flex bg-slate-100 p-1 rounded-xl w-full md:w-auto">
              {(['PENDING', 'ACCEPTED', 'REJECTED'] as const).map(state => (
                <button
                  key={state}
                  className={`flex-1 md:flex-none px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                    tab === state
                      ? 'bg-white text-blue-900 shadow-sm border border-slate-200'
                      : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                  }`}
                  onClick={() => setTab(state)}
                >
                  {state === 'PENDING'
                    ? 'Pendientes'
                    : state === 'ACCEPTED'
                      ? 'Aceptadas'
                      : 'Rechazadas'}
                </button>
              ))}
            </div>
            {/* Buscador */}
            <div className="w-full md:w-72">
              <input
                className="w-full px-4 py-2 bg-white border border-sky-200 rounded-xl shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:border-sky-500 focus:ring-sky-200 text-slate-700 placeholder-slate-400"
                type="text"
                value={search}
                onChange={event => setSearch(event.target.value)}
                placeholder="Buscar por nombre o RUT..."
              />
            </div>
          </div>
          <UsersTable
            users={filteredByTabAndSearch}
            loading={loading}
            error={error}
            redirectsTo={of === 'staff' ? '/staff/application/' : '/student/application/'}
          />
        </div>
      </main>
    </>
  )
}
