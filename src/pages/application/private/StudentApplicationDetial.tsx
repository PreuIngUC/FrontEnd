import { useNavigate, useParams } from 'react-router-dom'
import useApplication from '../../../hooks/useApplication.ts'
import { useApi } from '../../../wrappers/ApiProvider.tsx'
import { useState } from 'react'

export default function StudentApplicationDetail({ justRead }: { justRead: boolean }) {
  const { rut } = useParams<{ rut: string }>()
  const { user, loading, error, mutating, refetch } = useApplication({ of: 'student', rut })
  const api = useApi()
  const navigate = useNavigate()
  const [editing, setEditing] = useState<boolean>(false)

  if (!rut) return <main className="p-6">Falta rut en la URL.</main>
  if (loading || !api) return <main className="p-6">Cargando...</main>
  if (error) return <main className="p-6">Error: {error}</main>
  if (!user) return <main className="p-6">No encontrado.</main>

  const isPending = user.studentProfile.applicationState === 'PENDING_AS_STUDENT'
  const isAccepted = user.studentProfile.applicationState === 'ACCEPTED_AS_STUDENT'
  const isRejected = user.studentProfile.applicationState === 'REJECTED_AS_STUDENT'

  const onAccept = async () => {
    if (mutating || justRead) return
    await api.changeApplicationState({
      of: 'student',
      params: { id: user.id, applicationState: 'ACCEPTED_AS_STUDENT' },
    })
    refetch()
    console.log('accept', rut)
  }

  const onReject = async () => {
    if (mutating || justRead) return
    await api.changeApplicationState({
      of: 'student',
      params: { id: user.id, applicationState: 'REJECTED_AS_STUDENT' },
    })
    refetch()
    console.log('reject', rut)
  }

  const onUndoAccept = async () => {
    if (mutating || justRead) return
    await api.changeApplicationState({
      of: 'student',
      params: { id: user.id, applicationState: 'PENDING_AS_STUDENT' },
    })
    refetch()
    console.log('undo accept', rut)
  }

  const onUndoReject = async () => {
    if (mutating || justRead) return
    await api.changeApplicationState({
      of: 'student',
      params: { id: user.id, applicationState: 'PENDING_AS_STUDENT' },
    })
    refetch()
    console.log('undo reject', rut)
  }

  return (
    <main className="min-h-screen pb-24">
      {/* Header simple */}
      <div className="p-6 border-b">
        <button className="underline" onClick={() => navigate(-1)}>
          Volver
        </button>

        <h1 className="text-xl font-semibold mt-3">Detalle de postulación</h1>
        <p className="text-sm text-gray-600 mt-1">{user.names}</p>
        <p className="text-sm text-gray-600">
          {user.studentProfile.applicationState === 'ACCEPTED_AS_STUDENT'
            ? 'Aceptad@'
            : user.studentProfile.applicationState === 'PENDING_AS_STUDENT'
              ? 'Pendiente'
              : 'Rechazad@'}
        </p>
        <button className="underline" onClick={() => setEditing(true)}>
          Editar
        </button>
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
