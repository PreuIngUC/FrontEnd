import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import useCourse from '../../hooks/useCourse'
import TextField from '../../components/form/TextField'
import CheckboxField from '../../components/form/CheckboxField'
import { useApi } from '../../wrappers/ApiProvider'
import SectionsTable from '../../components/sections/SectionsTable'

const CourseSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio'),
  startDate: z.string().nullable().optional(),
  endDate: z.string().nullable().optional(),
  openForTeachers: z.boolean(),
  openForCoordinators: z.boolean(),
  openForEditors: z.boolean(),
  openForMonitors: z.boolean(),
  openForVolunteers: z.boolean(),
  openForManagers: z.boolean(),
  openForDesigners: z.boolean(),
  openForDevelopers: z.boolean(),
  openForDirectors: z.boolean(),
  finished: z.boolean(),
})

type FormType = z.input<typeof CourseSchema>

const SectionTitle = ({
  title,
  action,
  className = 'mt-8',
}: {
  title: string
  action?: React.ReactNode
  className?: string
}) => (
  <div className={`mb-6 border-b border-sky-100 pb-2 flex justify-between items-end ${className}`}>
    <h3 className="text-xl font-bold text-blue-900">{title}</h3>
    {action}
  </div>
)

export default function CourseDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { course, loading, error, refetch } = useCourse({ id })
  const [editing, setEditing] = useState<boolean>(false)
  const api = useApi()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormType>({
    resolver: zodResolver(CourseSchema),
  })

  useEffect(() => {
    if (course) {
      reset({
        name: course.name,
        startDate: course.startDate ? course.startDate.slice(0, 10) : '',
        endDate: course.endDate ? course.endDate.slice(0, 10) : '',
        openForTeachers: course.openForTeachers,
        openForCoordinators: course.openForCoordinators,
        openForEditors: course.openForEditors,
        openForMonitors: course.openForMonitors,
        openForDesigners: course.openForDesigners,
        openForDevelopers: course.openForDevelopers,
        openForDirectors: course.openForDirectors,
        openForVolunteers: course.openForVolunteers,
        openForManagers: course.openForManagers,
        finished: course.finished,
      })
    }
  }, [course, reset])

  if (!id) return <main className="p-6">Falta id en la URL.</main>
  if (loading) return <main className="p-6">Cargando...</main>
  if (error) return <main className="p-6">Error: {error}</main>
  if (!course) return <main className="p-6">Curso no encontrado.</main>

  const onSubmitEdit = async (values: FormType) => {
    if (!api || !id) return
    try {
      const body = {
        ...values,
        startDate: values.startDate || null,
        endDate: values.endDate || null,
      }
      await api.editCourse({ id, body })
      await refetch()
      setEditing(false)
    } catch (error) {
      console.error(error)
      reset()
    }
  }

  return (
    <main className="min-h-screen bg-sky-50 pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white p-6 border-b border-sky-100 shadow-sm flex justify-between items-start">
        <div>
          <button
            className="text-blue-600 hover:underline text-sm mb-2"
            onClick={() => navigate(-1)}
          >
            &larr; Volver
          </button>
          <h1 className="text-2xl font-bold text-blue-900 mt-1">{course.name}</h1>
          <div className="mt-2 inline-block px-3 py-1 bg-slate-100 rounded-full text-sm font-semibold text-slate-600">
            Estado: {course.finished ? 'Finalizado' : 'Activo'}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-6 mt-4 flex flex-col gap-6">
        <form
          onSubmit={handleSubmit(onSubmitEdit)}
          className="bg-white rounded-xl shadow-sm border border-sky-100 p-8"
        >
          {/* SECCIÓN 1: INFORMACIÓN DEL CURSO */}
          <SectionTitle
            title="Información del Curso"
            className=""
            action={
              !editing && (
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-100 text-blue-800 rounded-md font-medium hover:bg-blue-200 transition-colors text-sm"
                  onClick={() => setEditing(true)}
                >
                  Editar Datos
                </button>
              )
            }
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <TextField
              label="Nombre del Curso"
              register={register}
              errorMessage={errors?.name?.message}
              prop="name"
              readOnly={!editing}
            />
            {!editing && !course.startDate ? (
              <div className="flex flex-col w-full">
                <label className="text-sm font-semibold text-blue-900">Fecha de Inicio</label>
                <input
                  type="text"
                  value="Sin Fecha"
                  className="w-full px-4 py-2 mt-1 bg-white border rounded-xl shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 bg-transparent border-transparent shadow-none px-0 text-slate-800"
                  readOnly
                />
                <div className="min-h-[20px] mt-1"></div>
              </div>
            ) : (
              <TextField
                label="Fecha de Inicio"
                register={register}
                errorMessage={errors?.startDate?.message}
                prop="startDate"
                readOnly={!editing}
                type="date"
              />
            )}
            {!editing && !course.endDate ? (
              <div className="flex flex-col w-full">
                <label className="text-sm font-semibold text-blue-900">Fecha de Término</label>
                <input
                  type="text"
                  value="Sin Fecha"
                  className="w-full px-4 py-2 mt-1 bg-white border rounded-xl shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 bg-transparent border-transparent shadow-none px-0 text-slate-800"
                  readOnly
                />
                <div className="min-h-[20px] mt-1"></div>
              </div>
            ) : (
              <TextField
                label="Fecha de Término"
                register={register}
                errorMessage={errors?.endDate?.message}
                prop="endDate"
                readOnly={!editing}
                type="date"
              />
            )}
          </div>
          {/* SECCIÓN 2: CONFIGURACIÓN */}
          <SectionTitle title="Configuración" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <CheckboxField
              label="Abierto para Directores"
              register={register}
              errorMessage={errors?.openForDirectors?.message}
              prop="openForDirectors"
              readOnly={!editing}
            />
            <CheckboxField
              label="Abierto para Coordinadores"
              register={register}
              errorMessage={errors?.openForCoordinators?.message}
              prop="openForCoordinators"
              readOnly={!editing}
            />
            <CheckboxField
              label="Abierto para Encargados"
              register={register}
              errorMessage={errors?.openForManagers?.message}
              prop="openForManagers"
              readOnly={!editing}
            />
            <CheckboxField
              label="Abierto para Profesores"
              register={register}
              errorMessage={errors?.openForTeachers?.message}
              prop="openForTeachers"
              readOnly={!editing}
            />
            <CheckboxField
              label="Abierto para Monitores"
              register={register}
              errorMessage={errors?.openForMonitors?.message}
              prop="openForMonitors"
              readOnly={!editing}
            />
            <CheckboxField
              label="Abierto para Editores"
              register={register}
              errorMessage={errors?.openForEditors?.message}
              prop="openForEditors"
              readOnly={!editing}
            />
            <CheckboxField
              label="Abierto para Voluntarios"
              register={register}
              errorMessage={errors?.openForVolunteers?.message}
              prop="openForVolunteers"
              readOnly={!editing}
            />
            <CheckboxField
              label="Abierto para Diseñadores"
              register={register}
              errorMessage={errors?.openForDesigners?.message}
              prop="openForDesigners"
              readOnly={!editing}
            />
            <CheckboxField
              label="Abierto para Desarrolladores"
              register={register}
              errorMessage={errors?.openForDevelopers?.message}
              prop="openForDevelopers"
              readOnly={!editing}
            />
            <CheckboxField
              label="Curso Finalizado"
              register={register}
              errorMessage={errors?.finished?.message}
              prop="finished"
              readOnly={!editing}
            />
          </div>
          {/* ACCIONES DE EDICIÓN */}
          {editing && (
            <div className="mt-8 pt-6 border-t border-sky-100 flex items-center justify-end gap-4">
              <button
                type="button"
                className="px-6 py-2 border border-slate-300 rounded-md text-slate-700 hover:bg-slate-50 font-medium"
                onClick={() => {
                  reset()
                  setEditing(false)
                }}
                disabled={isSubmitting}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
              </button>
            </div>
          )}
        </form>
        <div className="bg-white rounded-xl shadow-sm border border-sky-100 p-8">
          <SectionTitle title="Secciones del Curso" className="" />
          <SectionsTable sections={course.sections} loading={loading} error={error} />
        </div>
      </div>
    </main>
  )
}
