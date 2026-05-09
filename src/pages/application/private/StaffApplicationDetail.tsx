import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { paths } from '../../../api/types.ts'

import useApplication from '../../../hooks/useApplication.ts'
import { useApi } from '../../../wrappers/ApiProvider.tsx'

import TextField from '../../../components/form/TextField.tsx'
import SelectField from '../../../components/form/SelectField.tsx'
import NumberField from '../../../components/form/NumberField.tsx'
import * as selectFieldsOptions from '../../../constants/applications/students/SelectFieldsOptions.ts'

// Zod schema based on types.ts
const StaffApplicationEditSchema = z.object({
  user: z
    .object({
      rut: z.string().min(1, 'Requerido'),
      names: z.string().min(1, 'Requerido'),
      lastName0: z.string().min(1, 'Requerido'),
      lastName1: z.string().min(1, 'Requerido'),
      pronouns: z.enum(['EL_LO', 'ELLA_LA', 'ELLE_LE'], {
        error: 'Debe seleccionar una opción válida',
      }),
      email: z.string().min(1, 'Requerido').email('Correo inválido'),
      confirmEmail: z.string().min(1, 'Requerido').email('Correo inválido'),
      birthDate: z.string().min(1, 'Requerido'),
      phoneNumber: z.string().min(1, 'Requerido'),
    })
    .refine(data => data.email === data.confirmEmail, {
      message: 'Los correos no coinciden',
      path: ['confirmEmail'],
    }),
  staffProfile: z.object({
    applicationState: z.any(),
    program: z.string().min(1, 'Requerido'),
    university: z.string().min(1, 'Requerido'),
    entryYear: z.coerce
      .number()
      .int('Debe ser entero')
      .min(1900, 'Año inválido')
      .max(new Date().getFullYear() + 1, 'Año inválido'),
    studentNumber: z.string(),
  }),
  courseApplications: z.array(
    z.object({
      id: z.string(),
      course: z.string(),
      type: z.enum(['COORDINATOR', 'TEACHER']),
      status: z.enum(['PENDING', 'ACCEPTED', 'REJECTED']),
    }),
  ),
})

type BodyType =
  paths['/api/private/staff/application/:id']['patch']['requestBody']['content']['application/json']
type FormType = z.input<typeof StaffApplicationEditSchema>

const SectionTitle = ({ title }: { title: string }) => (
  <div className="mb-6 mt-8 border-b border-sky-100 pb-2 flex justify-between items-end">
    <h3 className="text-xl font-bold text-blue-900">{title}</h3>
  </div>
)

function mapFormToBody(values: FormType): BodyType {
  const { confirmEmail, birthDate, ...restUser } = values.user
  const staffProfile = values.staffProfile
  const courseApplications = values.courseApplications
  void confirmEmail

  return {
    user: {
      ...restUser,
      birthDate: birthDate ? (birthDate as unknown as string) : null,
      staffProfile: {
        ...staffProfile,
        entryYear: Number(staffProfile.entryYear),
      },
      courseApplications,
    },
  } as unknown as BodyType
}

export default function StaffApplicationDetail({ justRead }: { justRead: boolean }) {
  const { id } = useParams<{ id: string }>()
  const { user, loading, error, refetch } = useApplication({ of: 'staff', id })
  const api = useApi()
  const navigate = useNavigate()

  const [editing, setEditing] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormType>({
    resolver: zodResolver(StaffApplicationEditSchema),
  })

  const { fields } = useFieldArray({
    control,
    name: 'courseApplications',
  })

  useEffect(() => {
    if (user) {
      const { staffProfile, courseApplications, ...userData } = user
      reset({
        user: {
          ...userData,
          birthDate: userData.birthDate?.slice(0, 10),
          confirmEmail: userData.email,
        },
        staffProfile,
        courseApplications: courseApplications || [],
      })
    }
  }, [user, reset])

  if (!id) return <main className="p-6">Falta id en la URL.</main>
  if (loading || !api) return <main className="p-6">Cargando...</main>
  if (error) return <main className="p-6">Error: {error}</main>
  if (!user) return <main className="p-6">No encontrado.</main>

  const isPending = user.staffProfile.applicationState === 'PENDING_AS_STAFF'
  const isAccepted = user.staffProfile.applicationState === 'ACCEPTED_AS_STAFF'
  const isRejected = user.staffProfile.applicationState === 'REJECTED_AS_STAFF'
  const hasPendingCourses = user.courseApplications?.some(app => app.status === 'PENDING')

  const onAccept = async () => {
    if (loading || justRead || !id) return
    await api.changeApplicationState({
      of: 'staff',
      params: { id, applicationState: 'ACCEPTED_AS_STAFF' },
    })
    refetch()
  }
  const onReject = async () => {
    if (loading || justRead || !id) return
    await api.changeApplicationState({
      of: 'staff',
      params: { id, applicationState: 'REJECTED_AS_STAFF' },
    })
    refetch()
  }
  const onUndoAccept = async () => {
    if (loading || justRead || !id) return
    await api.changeApplicationState({
      of: 'staff',
      params: { id, applicationState: 'PENDING_AS_STAFF' },
    })
    refetch()
  }
  const onUndoReject = async () => {
    if (loading || justRead || !id) return
    await api.changeApplicationState({
      of: 'staff',
      params: { id, applicationState: 'PENDING_AS_STAFF' },
    })
    refetch()
  }

  const onSubmitEdit = async (values: FormType) => {
    try {
      const bodyForm = mapFormToBody(values)
      await api.editApplication({ of: 'staff', params: { id }, body: bodyForm })
      setEditing(false)
      refetch()
    } catch {
      console.log('Error al editar')
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
          <h1 className="text-2xl font-bold text-blue-900 mt-1">Detalle de postulación (Equipo)</h1>
          <p className="text-md text-slate-700 font-medium mt-1">{user.names}</p>
          <div className="mt-2 inline-block px-3 py-1 bg-slate-100 rounded-full text-sm font-semibold text-slate-600">
            Estado: {isAccepted ? 'Aceptado' : isPending ? 'Pendiente' : 'Rechazado'}
          </div>
        </div>

        {!justRead && !editing && (
          <button
            className="px-4 py-2 bg-blue-100 text-blue-800 rounded-md font-medium hover:bg-blue-200 transition-colors"
            onClick={() => setEditing(true)}
          >
            Editar Datos
          </button>
        )}
      </div>

      <div className="max-w-5xl mx-auto p-6 mt-4">
        <form
          onSubmit={handleSubmit(onSubmitEdit)}
          className="bg-white rounded-xl shadow-sm border border-sky-100 p-8"
        >
          {/* SECCIÓN 1: DATOS PERSONALES */}
          <SectionTitle title="Datos Personales" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <TextField
              label="Nombres"
              register={register}
              errorMessage={errors?.user?.names?.message}
              prop="user.names"
              readOnly={!editing}
            />
            <TextField
              label="Apellido Paterno"
              register={register}
              errorMessage={errors?.user?.lastName0?.message}
              prop="user.lastName0"
              readOnly={!editing}
            />
            <TextField
              label="Apellido Materno"
              register={register}
              errorMessage={errors?.user?.lastName1?.message}
              prop="user.lastName1"
              readOnly={!editing}
            />
            <TextField
              label="RUT"
              register={register}
              errorMessage={errors?.user?.rut?.message}
              prop="user.rut"
              readOnly={!editing}
            />
            <SelectField
              label="Pronombres"
              register={register}
              errorMessage={errors?.user?.pronouns?.message}
              prop="user.pronouns"
              options={selectFieldsOptions.pronounsOpts}
              readOnly={!editing}
            />
            <TextField
              label="Fecha de Nacimiento"
              register={register}
              errorMessage={errors?.user?.birthDate?.message}
              prop="user.birthDate"
              readOnly={!editing}
              type="date"
            />
            <TextField
              label="Número de Teléfono"
              register={register}
              errorMessage={errors?.user?.phoneNumber?.message}
              prop="user.phoneNumber"
              readOnly={!editing}
            />
            <TextField
              label="Email"
              register={register}
              errorMessage={errors?.user?.email?.message}
              prop="user.email"
              readOnly={!editing}
            />
            {editing ? (
              <TextField
                label="Confirmación de Email"
                register={register}
                errorMessage={errors?.user?.confirmEmail?.message}
                prop="user.confirmEmail"
                readOnly={!editing}
              />
            ) : null}
          </div>

          {/* SECCIÓN 2: ANTECEDENTES ACADÉMICOS (STAFF) */}
          <SectionTitle title="Antecedentes Académicos (Universidad)" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <TextField
              label="Universidad"
              register={register}
              errorMessage={errors?.staffProfile?.university?.message}
              prop="staffProfile.university"
              readOnly={!editing}
            />
            <TextField
              label="Carrera"
              register={register}
              errorMessage={errors?.staffProfile?.program?.message}
              prop="staffProfile.program"
              readOnly={!editing}
            />
            <NumberField
              label="Año de Ingreso"
              register={register}
              errorMessage={errors?.staffProfile?.entryYear?.message}
              prop="staffProfile.entryYear"
              readOnly={!editing}
            />
            <TextField
              label="Número de Alumno"
              register={register}
              errorMessage={errors?.staffProfile?.studentNumber?.message}
              prop="staffProfile.studentNumber"
              readOnly={!editing}
            />
          </div>

          {/* SECCIÓN 3: POSTULACIONES A CURSOS */}
          <SectionTitle title="Postulaciones a Cursos" />
          {hasPendingCourses && (
            <p className="text-red-600 font-medium mb-4">
              Aún quedan postulaciones a cursos pendientes.
            </p>
          )}
          <div className="overflow-x-auto rounded-xl border border-sky-100 shadow-sm mb-6">
            <table className="w-full border-collapse text-left">
              <thead className="bg-sky-50 border-b border-sky-100">
                <tr>
                  <th className="py-3 px-4 font-semibold text-blue-900 text-sm">Curso</th>
                  <th className="py-3 px-4 font-semibold text-blue-900 text-sm">Cargo</th>
                  <th className="py-3 px-4 font-semibold text-blue-900 text-sm w-1/3">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sky-50">
                {fields.map((field, index) => (
                  <tr
                    key={field.id}
                    className="transition-colors hover:bg-blue-50/50 even:bg-slate-50 odd:bg-white"
                  >
                    <td className="py-3 px-4 text-slate-700 font-medium">{field.course}</td>
                    <td className="py-3 px-4 text-slate-600 text-sm">
                      {field.type === 'TEACHER' ? 'Profesor(a)' : 'Coordinador(a)'}
                    </td>
                    <td className="py-3 px-4">
                      {editing ? (
                        <select
                          {...register(`courseApplications.${index}.status` as const)}
                          className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700"
                        >
                          <option value="PENDING">Pendiente</option>
                          <option value="ACCEPTED">Aceptado</option>
                          <option value="REJECTED">Rechazado</option>
                        </select>
                      ) : (
                        <span
                          className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${field.status === 'ACCEPTED' ? 'bg-green-100 text-green-800' : field.status === 'REJECTED' ? 'bg-red-100 text-red-800' : 'bg-slate-100 text-slate-800'}`}
                        >
                          {field.status === 'ACCEPTED'
                            ? 'Aceptado'
                            : field.status === 'REJECTED'
                              ? 'Rechazado'
                              : 'Pendiente'}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
                {fields.length === 0 && (
                  <tr>
                    <td colSpan={3} className="py-8 text-center text-slate-500">
                      No hay postulaciones a cursos
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* BARRA INFERIOR DE ACCIONES */}
          {!justRead && (
            <div className="fixed bottom-0 left-0 right-0 border-t border-sky-200 bg-white p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-10">
              <div className="max-w-5xl mx-auto flex items-center justify-end gap-4">
                {editing ? (
                  <>
                    <button
                      type="button"
                      className="px-6 py-2 border border-slate-300 rounded-md text-slate-700 hover:bg-slate-50 font-medium"
                      onClick={() => {
                        reset() // Deshace los cambios no guardados
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
                  </>
                ) : (
                  <>
                    {/* Botones de decisión originales cuando NO se está editando */}
                    {isPending && (
                      <>
                        <button
                          className="px-6 py-2 border border-red-200 text-red-700 bg-red-50 rounded-md hover:bg-red-100 font-medium"
                          onClick={onReject}
                          type="button"
                        >
                          Rechazar
                        </button>
                        <button
                          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                          onClick={onAccept}
                          type="button"
                          disabled={hasPendingCourses}
                        >
                          Aceptar
                        </button>
                      </>
                    )}
                    {isAccepted && (
                      <button
                        className="px-6 py-2 border border-orange-200 text-orange-700 bg-orange-50 rounded-md hover:bg-orange-100 font-medium"
                        onClick={onUndoAccept}
                        type="button"
                      >
                        Deshacer aprobación
                      </button>
                    )}
                    {isRejected && (
                      <button
                        className="px-6 py-2 border border-orange-200 text-orange-700 bg-orange-50 rounded-md hover:bg-orange-100 font-medium"
                        onClick={onUndoReject}
                        type="button"
                      >
                        Deshacer rechazo
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </form>
      </div>
    </main>
  )
}
