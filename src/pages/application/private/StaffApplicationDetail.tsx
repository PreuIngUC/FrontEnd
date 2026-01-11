import { useNavigate, useParams } from 'react-router-dom'
import useApplication from '../../../hooks/useApplication.ts'
import { useApi } from '../../../wrappers/ApiProvider.tsx'

export default function StaffApplicationDetail({ justRead }: { justRead: boolean }) {
  const { id } = useParams<{ id: string }>()
  const { user, loading, error, mutating, refetch } = useApplication({ of: 'staff', id })
  const api = useApi()
  const navigate = useNavigate()

  if (!id) return <main className="p-6">Falta userId en la URL.</main>
  if (loading || !api) return <main className="p-6">Cargando...</main>
  if (error) return <main className="p-6">Error: {error}</main>
  if (!user) return <main className="p-6">No encontrado.</main>

  const isPending = user.staffProfile.applicationState === 'PENDING_AS_STAFF'
  const isAccepted = user.staffProfile.applicationState === 'ACCEPTED_AS_STAFF'
  const isRejected = user.staffProfile.applicationState === 'REJECTED_AS_STAFF'

  const onAccept = async () => {
    if (mutating || justRead) return
    await api.changeApplicationState({
      of: 'staff',
      params: { id, applicationState: 'ACCEPTED_AS_STAFF' },
    })
    refetch()
    console.log('accept', id)
  }

  const onReject = async () => {
    if (mutating || justRead) return
    await api.changeApplicationState({
      of: 'staff',
      params: { id, applicationState: 'REJECTED_AS_STAFF' },
    })
    refetch()
    console.log('reject', id)
  }

  const onUndoAccept = async () => {
    if (mutating || justRead) return
    await api.changeApplicationState({
      of: 'staff',
      params: { id, applicationState: 'PENDING_AS_STAFF' },
    })
    refetch()
    console.log('undo accept', id)
  }

  const onUndoReject = async () => {
    if (mutating || justRead) return
    await api.changeApplicationState({
      of: 'staff',
      params: { id, applicationState: 'PENDING_AS_STAFF' },
    })
    refetch()
    console.log('undo reject', id)
  }

  return (
    <main className="min-h-screen pb-24">
      {/* Header simple */}
      <div className="p-6 border-b">
        <button className="underline" onClick={() => navigate(-1)}>
          Volver
        </button>

        <h1 className="text-xl font-semibold mt-3">Detalle de postulación</h1>
        <p className="text-sm text-gray-600 mt-1">Usuario ID: {user.id}</p>
        <p className="text-sm text-gray-600">Estado: {user.staffProfile.applicationState}</p>
      </div>

      {/* Contenido scrolleable */}
      <div className="p-6 space-y-3">
        {/* 👇 Reemplaza esto por tus atributos reales */}
        <div className="border rounded p-4">
          <h2 className="font-semibold mb-2">Datos del postulante</h2>

          {/* Ejemplo de “lista de atributos” (genérico) */}
          <ul className="space-y-2">
            {/* Reemplaza estos <li> por tus campos */}
            <li>
              <span className="font-medium">Campo 1:</span> <span>...</span>
            </li>
            <li>
              <span className="font-medium">Campo 2:</span> <span>...</span>
            </li>
            <li>
              <span className="font-medium">Campo 3:</span> <span>...</span>
            </li>
          </ul>
        </div>

        {/* Puedes agregar más bloques si quieres */}
        <div className="border rounded p-4">
          <h2 className="font-semibold mb-2">Información adicional</h2>
          <p className="text-gray-600 text-sm">(Espacio para más atributos / respuestas / etc.)</p>
        </div>
      </div>

      {/* Barra fija inferior */}
      {!justRead && (
        <div className="fixed bottom-0 left-0 right-0 border-t bg-white">
          <div className="p-4 flex items-center justify-end gap-3">
            {isPending && (
              <>
                <button className="px-4 py-2 border rounded" onClick={onReject} type="button">
                  Rechazar
                </button>

                <button
                  className="px-4 py-2 border rounded font-semibold"
                  onClick={onAccept}
                  type="button"
                >
                  Aceptar
                </button>
              </>
            )}

            {isAccepted && (
              <>
                <button
                  className="px-4 py-2 border rounded font-semibold"
                  onClick={onUndoAccept}
                  type="button"
                >
                  Deshacer aprobación
                </button>
              </>
            )}
            {isRejected && (
              <>
                <button
                  className="px-4 py-2 border rounded font-semibold"
                  onClick={onUndoReject}
                  type="button"
                >
                  Deshacer rechazo
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  )
}
