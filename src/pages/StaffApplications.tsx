import { useNavigate } from 'react-router-dom'
import useApplications from '../hooks/useApplications.ts'
import { useMemo, useState } from 'react'

export default function StaffApplications() {
  const { users, loading, error } = useApplications({ of: 'staff' })
  const [tab, setTab] =
    useState<(typeof users)[number]['staffProfile']['applicationState']>('PENDING_AS_STAFF')
  const navigate = useNavigate()

  const filtered = useMemo(() => {
    return users.filter(u => u.staffProfile.applicationState === tab)
  }, [users, tab])

  return (
    <main className="p-6">
      <h1 className="text-xl font-semibold mb-4">Postulaciones</h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          className={`px-4 py-2 border ${
            tab === 'PENDING_AS_STAFF' ? 'font-semibold border-black' : 'border-gray-300'
          }`}
          onClick={() => setTab('PENDING_AS_STAFF')}
        >
          Pendientes
        </button>

        <button
          className={`px-4 py-2 border ${
            tab === 'ACCEPTED_AS_STAFF' ? 'font-semibold border-black' : 'border-gray-300'
          }`}
          onClick={() => setTab('ACCEPTED_AS_STAFF')}
        >
          Aceptadas
        </button>

        <button
          className={`px-4 py-2 border ${
            tab === 'REJECTED_AS_STAFF' ? 'font-semibold border-black' : 'border-gray-300'
          }`}
          onClick={() => setTab('REJECTED_AS_STAFF')}
        >
          Rechazadas
        </button>
      </div>

      {/* Tabla */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">Nombre</th>
            <th className="text-left py-2">Acción</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((u, index) => (
            <tr key={index} className="border-b">
              <td className="py-2">
                {u.lastName0} {u.lastName1} {u.names}
              </td>
              <td className="py-2">
                <button
                  className="underline"
                  onClick={() => navigate(`/staff/application/${u.id}`)}
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
                No hay postulaciones en esta pestaña.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </main>
  )
}
