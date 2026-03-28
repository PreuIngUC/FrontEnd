import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

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
    <main className="p-6">
      <h1 className="text-xl font-semibold mb-4">Postulaciones</h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          className={`px-4 py-2 border ${
            tab === 'PENDING' ? 'font-semibold border-black' : 'border-gray-300'
          }`}
          onClick={() => setTab('PENDING')}
        >
          Pendientes
        </button>

        <button
          className={`px-4 py-2 border ${
            tab === 'ACCEPTED' ? 'font-semibold border-black' : 'border-gray-300'
          }`}
          onClick={() => setTab('ACCEPTED')}
        >
          Aceptadas
        </button>

        <button
          className={`px-4 py-2 border ${
            tab === 'REJECTED' ? 'font-semibold border-black' : 'border-gray-300'
          }`}
          onClick={() => setTab('REJECTED')}
        >
          Rechazadas
        </button>
      </div>
      {/* Bsucador */}
      <input
        className="border-1"
        type="text"
        value={search}
        onChange={event => setSearch(event.target.value)}
        placeholder="Buscar por nombre o RUT..."
      />
      {/* Tabla */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">Nombre</th>
            <th className="text-left py-2">RUT</th>
            <th className="text-left py-2">Acción</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((u, index) => (
            <tr key={index} className="border-b">
              <td className="py-2">
                {u.names} {u.lastName0} {u.lastName1}
              </td>
              <td className="py-2">{u.rut}</td>
              <td className="py-2">
                <button
                  className="underline"
                  onClick={() => navigate(`/${of}/application/${u.id}`)}
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
          {!loading && !error && filtered.length === 0 && (
            <tr>
              <td colSpan={2} className="py-4 text-gray-500">
                No hay postulaciones que coincidan con la búsqueda.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </main>
  )
}
