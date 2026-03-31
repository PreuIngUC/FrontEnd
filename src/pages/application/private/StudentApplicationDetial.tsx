import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type z from 'zod'
import type { paths } from '../../../api/types.ts'

import useApplication from '../../../hooks/useApplication.ts'
import { useApi } from '../../../wrappers/ApiProvider.tsx'
import { StudentApplicationDto } from '../../../schemas/UserApplications.ts'

import TextField from '../../../components/form/TextField.tsx'
import SelectField from '../../../components/form/SelectField.tsx'
import NumberField from '../../../components/form/NumberField.tsx'
import * as selectFieldsOptions from '../../../constants/applications/students/SelectFieldsOptions.ts'

type BodyType =
  paths['/api/private/student/application/:id']['patch']['requestBody']['content']['application/json']
// Tipo inferido del esquema para el formulario
type FormType = z.input<typeof StudentApplicationDto>

const SectionTitle = ({ title }: { title: string }) => (
  <div className="mb-6 mt-8 border-b border-sky-100 pb-2 flex justify-between items-end">
    <h3 className="text-xl font-bold text-blue-900">{title}</h3>
  </div>
)

function mapFormToBody(values: FormType): BodyType {
  const { confirmEmail, birthDate, ...restUser } = values.user
  const student = values.student
  void confirmEmail
  return {
    user: {
      ...restUser,
      birthDate: birthDate ? (birthDate as unknown as string) : null,
    },
    student,
  }
}

export default function StudentApplicationDetail({ justRead }: { justRead: boolean }) {
  const { id } = useParams<{ id: string }>()
  const { user, loading, error, mutating, refetch } = useApplication({ of: 'student', id })
  const api = useApi()
  const navigate = useNavigate()

  const [editing, setEditing] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormType>({
    resolver: zodResolver(StudentApplicationDto),
  })

  // Cuando la data del usuario cargue se llenan los datos
  useEffect(() => {
    if (user) {
      // console.log(user)
      const { studentProfile, id, ...userData } = user
      void id
      reset({
        user: {
          ...userData,
          birthDate: userData.birthDate?.slice(0, 10),
          confirmEmail: userData.email,
        },
        student: studentProfile,
      })
    }
  }, [user, reset])

  if (!id) return <main className="p-6">Falta id en la URL.</main>
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
    console.log('accept', id)
  }
  const onReject = async () => {
    if (mutating || justRead) return
    await api.changeApplicationState({
      of: 'student',
      params: { id: user.id, applicationState: 'REJECTED_AS_STUDENT' },
    })
    refetch()
    console.log('reject', id)
  }
  const onUndoAccept = async () => {
    if (mutating || justRead) return
    await api.changeApplicationState({
      of: 'student',
      params: { id: user.id, applicationState: 'PENDING_AS_STUDENT' },
    })
    refetch()
    console.log('undo accept', id)
  }
  const onUndoReject = async () => {
    if (mutating || justRead) return
    await api.changeApplicationState({
      of: 'student',
      params: { id: user.id, applicationState: 'PENDING_AS_STUDENT' },
    })
    refetch()
    console.log('undo reject', id)
  }

  // --- Función para guardar la edición ---
  const onSubmitEdit = async (values: FormType) => {
    try {
      const bodyForm = mapFormToBody(values)
      await api.editApplication({ of: 'student', params: { id }, body: bodyForm })
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
          <h1 className="text-2xl font-bold text-blue-900 mt-1">Detalle de postulación</h1>
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
              readOnly={!editing} // <- Clave para alternar modos
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
              errorMessage={errors?.user?.lastName0?.message}
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

          {/* SECCIÓN 2: ANTECEDENTES ACADÉMICOS */}
          <SectionTitle title="Antecedentes Académicos" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <SelectField
              label="Nivel Educacional"
              register={register}
              errorMessage={errors?.student?.educationalLevel?.message}
              prop="student.educationalLevel"
              options={selectFieldsOptions.educationalLevelOpts}
              readOnly={!editing}
            />
            <TextField
              label="Colegio de Procedencia"
              register={register}
              errorMessage={errors?.student?.school?.message}
              prop="student.school"
              readOnly={!editing}
            />
            <SelectField
              label="Tipo de Establecimiento"
              register={register}
              errorMessage={errors?.student?.schoolType?.message}
              prop="student.schoolType"
              options={selectFieldsOptions.schoolTypeOpts}
              readOnly={!editing}
            />
            <SelectField
              label="Dependencia del Colegio"
              register={register}
              errorMessage={errors?.student?.schoolDependency?.message}
              prop="student.schoolDependency"
              options={selectFieldsOptions.schoolDependencyOpts}
              readOnly={!editing}
            />
            <TextField
              label="Comuna de Residencia"
              register={register}
              errorMessage={errors?.student?.residence?.message}
              prop="student.residence"
              readOnly={!editing}
            />
          </div>

          <h4 className="text-md font-semibold text-blue-900 mb-4 mt-6">Promedios de Notas</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <NumberField
              label="1° Medio"
              register={register}
              errorMessage={errors?.student?.avg1M?.message}
              prop="student.avg1M"
              readOnly={!editing}
              step="0.1"
            />
            <NumberField
              label="2° Medio"
              register={register}
              errorMessage={errors?.student?.avg2M?.message}
              prop="student.avg2M"
              readOnly={!editing}
              step="0.1"
            />
            <NumberField
              label="3° Medio"
              register={register}
              errorMessage={errors?.student?.avg3M?.message}
              prop="student.avg3M"
              readOnly={!editing}
              step="0.1"
            />
            <NumberField
              label="4° Medio"
              register={register}
              errorMessage={errors?.student?.avg4M?.message}
              prop="student.avg4M"
              readOnly={!editing}
              step="0.1"
            />
          </div>

          <SectionTitle title="Intereses y Objetivos" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <SelectField
              label="Plan Electivo Elegido"
              register={register}
              errorMessage={errors?.student?.electiveTest?.message}
              prop="student.electiveTest"
              options={selectFieldsOptions.electiveTestOpts}
              readOnly={!editing}
            />
            <SelectField
              label="Rinde M2"
              register={register}
              errorMessage={errors?.student?.takesM2?.message}
              prop="student.takesM2"
              options={selectFieldsOptions.takesM2Opts}
              readOnly={!editing}
            />
            <TextField
              label="Carrera de Interés"
              register={register}
              errorMessage={errors?.student?.targetProgram?.message}
              prop="student.targetProgram"
              readOnly={!editing}
            />
            <TextField
              label="Universidad de Interés"
              register={register}
              errorMessage={errors?.student?.targetUniversity?.message}
              prop="student.targetUniversity"
              readOnly={!editing}
            />
            <TextField
              label="Planes y su relación con el preuniversitario"
              register={register}
              errorMessage={errors?.student?.goalsAndPlans?.message}
              prop="student.goalsAndPlans"
              readOnly={!editing}
            />
            <TextField
              label="Dificultades con el Horario"
              register={register}
              errorMessage={errors?.student?.scheduleDifficulties?.message}
              prop="student.scheduleDifficulties"
              readOnly={!editing}
            />
          </div>

          <SectionTitle title="Antecedentes Socioeconómicos" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <SelectField
              label="Tramo del Registro Social de Hogares"
              register={register}
              errorMessage={errors?.student?.rshSection?.message}
              prop="student.rshSection"
              options={selectFieldsOptions.rshSectionOpts}
              readOnly={!editing}
            />
            <NumberField
              label="Cantidad de integrantes en el hogar"
              register={register}
              errorMessage={errors?.student?.familySize?.message}
              prop="student.familySize"
              readOnly={!editing}
              step="1"
            />
            <NumberField
              label="Ingreso Total Familiar"
              register={register}
              errorMessage={errors?.student?.totalMonthlyIncome?.message}
              prop="student.totalMonthlyIncome"
              readOnly={!editing}
              step="1"
            />
          </div>

          <h4 className="text-md font-semibold text-blue-900 mb-4">Gastos Mensuales Estimados</h4>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
            <NumberField
              label="Alimentación"
              register={register}
              errorMessage={errors?.student?.monthlyFoodExpenses?.message}
              prop="student.monthlyFoodExpenses"
              readOnly={!editing}
              step="1"
            />
            <NumberField
              label="Educación"
              register={register}
              errorMessage={errors?.student?.monthlyEducationExpenses?.message}
              prop="student.monthlyEducationExpenses"
              readOnly={!editing}
              step="1"
            />
            <NumberField
              label="Cuentas Básicas"
              register={register}
              errorMessage={errors?.student?.monthlyUtilitiesExpenses?.message}
              prop="student.monthlyUtilitiesExpenses"
              readOnly={!editing}
              step="1"
            />
            <NumberField
              label="Telecomunicaciones"
              register={register}
              errorMessage={errors?.student?.monthlyTelecomExpenses?.message}
              prop="student.monthlyTelecomExpenses"
              readOnly={!editing}
              step="1"
            />
            <NumberField
              label="Vivienda"
              register={register}
              errorMessage={errors?.student?.monthlyHousingExpenses?.message}
              prop="student.monthlyHousingExpenses"
              readOnly={!editing}
              step="1"
            />
            <NumberField
              label="Salud"
              register={register}
              errorMessage={errors?.student?.monthlyHealthcareExpenses?.message}
              prop="student.monthlyHealthcareExpenses"
              readOnly={!editing}
              step="1"
            />
            <NumberField
              label="Otros Gastos"
              register={register}
              errorMessage={errors?.student?.monthlyMiscExpenses?.message}
              prop="student.monthlyMiscExpenses"
              readOnly={!editing}
              step="1"
            />
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
                          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium"
                          onClick={onAccept}
                          type="button"
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
