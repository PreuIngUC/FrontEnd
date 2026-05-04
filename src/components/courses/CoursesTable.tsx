import type BackendApi from '../../api/BackendApi'
import { useNavigate } from 'react-router-dom'

type Courses = Awaited<ReturnType<typeof BackendApi.prototype.getCourses>>['data']['courses']

export default function CoursesTable({
  courses,
  loading,
  error,
}: {
  courses: Courses
  loading: boolean
  error?: string
}) {
  const navigate = useNavigate()
  return (
    <div className="overflow-x-auto rounded-xl border border-sky-100 shadow-sm">
      <table className="w-full border-collapse text-left">
        <thead className="bg-sky-50 border-b border-sky-100">
          <tr>
            <th className="py-3 px-4 font-semibold text-blue-900 text-sm">Nombre</th>
            <th className="py-3 px-4 font-semibold text-blue-900 text-sm">Fecha de Inicio</th>
            <th className="py-3 px-4 font-semibold text-blue-900 text-sm">Fecha de Término</th>
            <th className="py-3 px-4 font-semibold text-blue-900 text-sm text-right">Acción</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-sky-50">
          {courses.map(c => (
            <tr
              key={c.id}
              className="transition-colors hover:bg-blue-50/50 even:bg-slate-50 odd:bg-white"
            >
              <td className="py-3 px-4 text-slate-700 font-medium">{c.name}</td>
              <td className="py-3 px-4 text-slate-600 font-mono text-sm">{c.startDate}</td>
              <td className="py-3 px-4 text-slate-600 font-mono text-sm">{c.endDate}</td>
              <td className="py-3 px-4 text-right">
                <button
                  className="inline-flex items-center px-3 py-1 bg-white border border-sky-200 text-blue-700 text-sm font-medium rounded-lg hover:bg-sky-50 hover:border-sky-300 transition-colors shadow-sm"
                  onClick={() => navigate(`/course/${c.id}`)}
                >
                  Revisar
                </button>
              </td>
            </tr>
          ))}
          {/* Estados de carga, error y vacío */}
          {loading && (
            <tr>
              <td colSpan={4} className="py-8 text-center text-slate-500 animate-pulse">
                Cargando cursos...
              </td>
            </tr>
          )}
          {error && (
            <tr>
              <td colSpan={4} className="py-8 text-center text-red-500 font-medium bg-red-50">
                Ocurrió un error: {error}
              </td>
            </tr>
          )}
          {!loading && !error && courses.length === 0 && (
            <tr>
              <td colSpan={4} className="py-12 text-center text-slate-500">
                <p className="text-lg font-medium text-slate-600 mb-1">Sin resultados</p>
                <p className="text-sm">No hay cursos en esta pestaña</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
