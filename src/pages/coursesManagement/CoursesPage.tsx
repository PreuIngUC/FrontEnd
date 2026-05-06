import { useMemo, useState } from 'react'
import HeadAndAction from '../../components/HeadAndAction'
import useCourses from '../../hooks/useCourses'
import CoursesTable from '../../components/courses/CoursesTable'
import CourseCreationModal from '../../components/courses/CourseCreationModal'

export default function CoursesPage() {
  const { courses, loading, error, refetch } = useCourses()
  const [finished, setFinished] = useState<boolean>(false)
  const [creationMode, setCreationMode] = useState<boolean>(false)

  const filtered = useMemo(() => {
    return courses.filter(c => c.finished === finished)
  }, [courses, finished])

  return (
    <>
      {creationMode && (
        <CourseCreationModal
          onClose={() => {
            setCreationMode(false)
          }}
          onSuccess={() => {
            setCreationMode(false)
            void refetch()
          }}
        />
      )}
      <main className="min-h-screen bg-sky-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-sky-100 p-6 md:p-8">
          <HeadAndAction
            title="Cursos"
            paragraph="Gestiona los cursos que se ofrecerán en el Preuniversitario"
            extra={
              <button
                className={`inline-flex items-center justify-center px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 shadow-sm whitespace-nowrap ${
                  creationMode || loading || error
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                    : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow border border-transparent focus:ring-2 focus:ring-blue-500 focus:ring-offset-1'
                }`}
                onClick={() => setCreationMode(!creationMode)}
                disabled={creationMode || loading}
              >
                {creationMode || loading || error ? 'Cargando...' : 'Crear Curso'}
              </button>
            }
          />
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            {/* Selector de Estado (Tabs) */}
            <div className="flex bg-slate-100 p-1 rounded-xl w-full md:w-auto">
              {[true, false].map(active => (
                <button
                  key={active ? 'active' : 'finished'}
                  className={`flex-1 md:flex-none px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                    active === !finished
                      ? 'bg-white text-blue-900 shadow-sm border border-slate-200'
                      : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                  }`}
                  onClick={() => setFinished(!active)}
                >
                  {active ? 'Activos' : 'Finalizados'}
                </button>
              ))}
            </div>
          </div>
          <CoursesTable courses={filtered} loading={loading} error={error} />
        </div>
      </main>
    </>
  )
}
