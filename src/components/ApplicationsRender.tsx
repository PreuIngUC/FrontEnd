import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import UsersTable from './UsersTable'

interface User {
  id: string
  rut: string
  names: string
  lastName0: string
  lastName1: string
  applicationState: 'PENDING' | 'ACCEPTED' | 'REJECTED'
}

export default function ApplicationsRender({
  of,
  users,
  loading,
  error,
}: {
  of: 'staff' | 'student'
  users: User[]
  loading: boolean
  error: string | undefined
}) {
  const [tab, setTab] = useState<User['applicationState']>('PENDING')
  const [search, setSearch] = useState<string>('')
  const navigate = useNavigate()

  const filtered = useMemo(() => {
    const filter0 = users.filter(u => u.applicationState === tab)
    if (search === '') return filter0
    return filter0.filter(
      u =>
        [u.names, u.lastName0, u.lastName1]
          .join(' ')
          .toLowerCase()
          .includes(search.toLowerCase()) || u.rut.includes(search),
    )
  }, [users, tab, search])

  return (
    <main className="min-h-screen bg-sky-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-sky-100 p-6 md:p-8">
        {/* Cabecera */}
        <div className="mb-8 border-b border-sky-100 pb-4">
          <button
            className="text-blue-600 hover:text-blue-800 hover:underline text-sm font-medium mb-4 flex items-center gap-1 transition-colors"
            onClick={() => navigate(-1)}
          >
            &larr; Volver
          </button>
          <h1 className="text-3xl font-extrabold text-blue-900 tracking-tight">
            Postulaciones {of === 'staff' ? 'Staff' : 'Estudiantes'}
          </h1>
          <p className="mt-2 text-slate-600">Revisa y gestiona las solicitudes de ingreso.</p>
        </div>

        {/* Controles: Tabs y Buscador */}
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
        {/* Contenedor de la Tabla */}
        {UsersTable({
          users: filtered,
          loading,
          error,
          redirectsTo: of === 'staff' ? '/staff/application/' : 'student/application/',
        })}
      </div>
    </main>
  )
}
