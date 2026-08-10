import { useState } from 'react'
import { useApi } from '../../wrappers/ApiProvider'

export default function CourseCreationModal({
  onClose,
  onSuccess,
}: {
  onClose: () => void
  onSuccess: () => void
}) {
  const api = useApi()
  const [creating, setCreating] = useState<boolean>(false)

  // 1. Definimos los estados locales para cada campo del formulario
  const [name, setName] = useState<string>('')
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault() // 2. Evitamos la recarga de la página

    if (!api) return
    setCreating(true)

    try {
      const courseData = {
        name,
        ...(startDate ? { startDate } : {}),
        ...(endDate ? { endDate } : {}),
      }
      await api.createCourse(courseData as any) // TODO: agregar openForEditors y openForMonitors al formulario
      onSuccess()
    } catch (error) {
      console.error('Error al crear el curso:', error)
    } finally {
      setCreating(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-900/60 backdrop-blur-sm transition-opacity">
      <div className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col items-center w-full max-w-md animate-in fade-in zoom-in duration-200">
        <h2 className="text-xl font-bold mb-4">Crear Nuevo Curso</h2>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          {/* Input: Nombre del curso */}
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm font-medium text-slate-700 mb-1">
              Nombre del curso <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              placeholder="Ej. Matemáticas M1"
              className="border border-slate-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
              disabled={creating}
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>

          {/* Inputs: Fechas */}
          <div className="flex gap-4">
            <div className="flex flex-col w-full">
              <label htmlFor="startDate" className="text-sm font-medium text-slate-700 mb-1">
                Fecha de inicio <span className="text-slate-400 font-normal">(Opcional)</span>
              </label>
              <input
                id="startDate"
                type="date"
                className="border border-slate-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-700"
                disabled={creating}
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
              />
            </div>

            <div className="flex flex-col w-full">
              <label htmlFor="endDate" className="text-sm font-medium text-slate-700 mb-1">
                Fecha de término <span className="text-slate-400 font-normal">(Opcional)</span>
              </label>
              <input
                id="endDate"
                type="date"
                className="border border-slate-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-slate-700"
                disabled={creating}
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
              />
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={creating}
              className="px-4 py-2 text-slate-500 hover:bg-slate-100 rounded-lg disabled:opacity-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={creating}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center min-w-[100px] disabled:opacity-70 transition-colors"
            >
              {creating ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
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
              ) : (
                'Crear'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
