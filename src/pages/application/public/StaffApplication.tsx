import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { paths } from '../../../api/types.ts'
import SubmitApplicationButton from '../../../components/buttons/SubmitApplicationButton.tsx'
import TextField from '../../../components/form/TextField.tsx'
import SelectField from '../../../components/form/SelectField.tsx'
import NumberField from '../../../components/form/NumberField.tsx'
import { useApi } from '../../../wrappers/ApiProvider.tsx'
import { useNavigate } from 'react-router-dom'
import useCoursesAvailableForApplications from '../../../hooks/useCoursesAvailableForApplications.ts'
import * as selectFieldsOptions from '../../../constants/applications/students/SelectFieldsOptions.ts'
import CheckboxField from '../../../components/form/CheckboxField.tsx'

// --- Tipos y Esquema ---
type BodyType =
  paths['/api/public/staff/application']['post']['requestBody']['content']['application/json']

const StaffApplicationSchema = z.object({
  user: z
    .object({
      rut: z
        .string()
        .trim()
        .toUpperCase()
        .regex(/^\d{7,8}-[\dK]$/, { message: 'Formato inválido' }),
      names: z.string().min(2, 'Mínimo 2 caracteres').trim(),
      lastName0: z.string().min(2, 'Mínimo 2 caracteres').trim(),
      lastName1: z.string().min(2, 'Mínimo 2 caracteres').trim(),
      pronouns: z.enum(['EL_LO', 'ELLA_LA', 'ELLE_LE'], {
        error: 'Debe seleccionar una opción válida',
      }),
      email: z.string().min(1, 'Requerido').email('Correo inválido'),
      confirmEmail: z.string().min(1, 'Requerido').email('Correo inválido'),
      birthDate: z.string().min(1, 'Requerido'),
      phoneNumber: z
        .string()
        .trim()
        .regex(/^\+\d{11}$/, {
          message: 'Debe ser + seguido de 11 dígitos (ej: +56912345678)',
        }),
    })
    .refine(data => data.email === data.confirmEmail, {
      message: 'Los correos no coinciden',
      path: ['confirmEmail'],
    }),
  staff: z.object({
    program: z.string().min(1, 'Requerido'),
    university: z.string().min(1, 'Requerido'),
    entryYear: z.coerce
      .number({ error: 'Debe ser un número' })
      .int('Debe ser entero')
      .min(1900, 'Año inválido')
      .max(new Date().getFullYear() + 1, 'Año inválido'),
    studentNumber: z.string().min(1, 'Requerido'),
  }),
  applications: z
    .array(z.string())
    .min(1, 'Debes seleccionar al menos 1 cargo de interés para postular'),
})

type FormType = z.input<typeof StaffApplicationSchema>

// --- Helper Components para Estilo ---
const SectionTitle = ({ title, description }: { title: string; description?: string }) => (
  <div className="mb-6 mt-8 border-b border-sky-100 pb-2">
    <h3 className="text-xl font-bold text-blue-900">{title}</h3>
    {description && <p className="text-sm text-slate-500 mt-1">{description}</p>}
  </div>
)

// --- Lógica del Formulario ---
function mapFormToBody(values: FormType): BodyType {
  const { confirmEmail, birthDate, ...restUser } = values.user
  const staff = values.staff
  const applications = values.applications.map(app => {
    const [courseId, type] = app.split('_')
    return {
      courseId,
      type: type as
        | 'COORDINATOR'
        | 'TEACHER'
        | 'EDITOR'
        | 'MONITOR'
        | 'VOLUNTEER'
        | 'DIRECTOR'
        | 'DESIGNER'
        | 'DEVELOPER'
        | 'MANAGER',
    }
  })
  void confirmEmail
  return {
    user: {
      ...restUser,
      birthDate: birthDate ? (birthDate as unknown as string) : null,
    },
    staff: {
      ...staff,
      entryYear: Number(staff.entryYear),
    },
    applications,
  }
}

function StaffApplication() {
  const api = useApi()
  const navigate = useNavigate()
  const { courses, loading, error } = useCoursesAvailableForApplications()

  const [uniChoice, setUniChoice] = useState<'puc' | 'otra' | ''>('')
  const [programChoice, setProgramChoice] = useState<'civil' | 'licc' | 'college' | 'otra' | ''>('')

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormType>({
    resolver: zodResolver(StaffApplicationSchema),
    defaultValues: {
      user: {
        rut: '',
        email: '',
        confirmEmail: '',
        names: '',
        lastName0: '',
        lastName1: '',
        pronouns: undefined,
        birthDate: '',
        phoneNumber: '',
      },
      staff: {
        program: '',
        university: '',
        entryYear: undefined as unknown as number,
        studentNumber: '',
      },
      applications: [],
    },
  })

  const onSubmit = async (values: FormType) => {
    try {
      const bodyForm = mapFormToBody(values)
      if (!api) return
      await api.sendApplication(bodyForm)
      navigate('/application/submitted')
    } catch {
      navigate('/application/failed')
    }
  }

  if (loading) return <div>Cargando...</div>
  if (error) return <div>Error al cargar el formulario.</div>
  if (courses.length === 0) return <div>No tenemos postulaciones abiertas en este momento.</div>

  return (
    <div className="min-h-screen bg-sky-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-sky-100">
        {/* ENCABEZADO DE LA TARJETA */}
        <div className="bg-blue-900 py-6 px-8 text-center sm:px-10">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Postulación Equipo 2026
          </h2>
          <p className="mt-2 text-sky-200 text-sm">
            Completa el formulario para ser parte del equipo del Preuniversitario Social de
            Ingeniería UC.
          </p>
        </div>

        {/* CUERPO DEL FORMULARIO */}
        <div className="py-8 px-8 sm:px-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* --- SECCIÓN 1: DATOS PERSONALES --- */}
            <SectionTitle title="Datos Personales" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              <TextField
                label="Nombres"
                register={register}
                errorMessage={errors?.user?.names?.message}
                prop="user.names"
              />
              <TextField
                label="Apellido Paterno"
                register={register}
                errorMessage={errors?.user?.lastName0?.message}
                prop="user.lastName0"
              />
              <TextField
                label="Apellido Materno"
                register={register}
                errorMessage={errors?.user?.lastName1?.message}
                prop="user.lastName1"
              />
              <TextField
                label="RUT (sin puntos y con guión)"
                placeholder="12345678-9"
                register={register}
                errorMessage={errors?.user?.rut?.message}
                prop="user.rut"
              />
              <SelectField
                label="Pronombres"
                register={register}
                errorMessage={errors?.user?.pronouns?.message}
                prop="user.pronouns"
                options={selectFieldsOptions.pronounsOpts}
              />
              <TextField
                label="Fecha de Nacimiento"
                type="date"
                register={register}
                errorMessage={errors?.user?.birthDate?.message}
                prop="user.birthDate"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <TextField
                label="Número de teléfono"
                placeholder="+56912345678"
                register={register}
                errorMessage={errors?.user?.phoneNumber?.message}
                prop="user.phoneNumber"
              />
              <div className="hidden md:block"></div>
              <TextField
                label="Email (Si eres alumno UC, ingresa el institucional)"
                placeholder="ejemplo@correo.cl"
                register={register}
                errorMessage={errors?.user?.email?.message}
                prop="user.email"
              />
              <TextField
                label="Confirma tu Email"
                placeholder="ejemplo@correo.cl"
                register={register}
                errorMessage={errors?.user?.confirmEmail?.message}
                prop="user.confirmEmail"
              />
            </div>

            {/* --- SECCIÓN 2: ANTECEDENTES ACADÉMICOS --- */}
            <SectionTitle title="Antecedentes Académicos (Universidad)" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex flex-col w-full">
                <label className="text-sm font-semibold text-blue-900">Universidad</label>
                <select
                  className={`w-full px-4 py-2 mt-1 bg-white border rounded-xl shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 cursor-pointer ${
                    uniChoice !== 'otra' && errors?.staff?.university
                      ? 'border-red-400 focus:border-red-500 focus:ring-red-200 text-red-900 bg-red-50/50'
                      : 'border-sky-200 focus:border-sky-500 focus:ring-sky-200 text-slate-700'
                  }`}
                  value={uniChoice}
                  onChange={e => {
                    const val = e.target.value as 'puc' | 'otra' | ''
                    setUniChoice(val)
                    if (val === 'puc') {
                      setValue('staff.university', 'Pontificia Universidad Católica de Chile', {
                        shouldValidate: true,
                      })
                    } else {
                      setValue('staff.university', '', { shouldValidate: true })
                    }
                  }}
                >
                  <option value="" disabled hidden>
                    Selecciona una opción...
                  </option>
                  <option value="puc">Pontificia Universidad Católica de Chile</option>
                  <option value="otra">Otra</option>
                </select>
                <div className="min-h-[20px] mt-1">
                  {uniChoice !== 'otra' && errors?.staff?.university && (
                    <p className="text-xs text-red-600 font-medium">
                      * {errors.staff.university.message}
                    </p>
                  )}
                </div>
              </div>

              {uniChoice === 'otra' && (
                <TextField
                  label="Nombre de la Universidad"
                  placeholder="Ej: Universidad de Chile"
                  register={register}
                  errorMessage={errors?.staff?.university?.message}
                  prop="staff.university"
                />
              )}

              <div className="flex flex-col w-full">
                <label className="text-sm font-semibold text-blue-900">Carrera</label>
                <select
                  className={`w-full px-4 py-2 mt-1 bg-white border rounded-xl shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 cursor-pointer ${
                    programChoice !== 'otra' && errors?.staff?.program
                      ? 'border-red-400 focus:border-red-500 focus:ring-red-200 text-red-900 bg-red-50/50'
                      : 'border-sky-200 focus:border-sky-500 focus:ring-sky-200 text-slate-700'
                  }`}
                  value={programChoice}
                  onChange={e => {
                    const val = e.target.value as 'civil' | 'licc' | 'college' | 'otra' | ''
                    setProgramChoice(val)
                    if (val === 'civil') {
                      setValue('staff.program', 'Ingeniería Civil', { shouldValidate: true })
                    } else if (val === 'licc') {
                      setValue('staff.program', 'LICC', { shouldValidate: true })
                    } else if (val === 'college') {
                      setValue('staff.program', 'College Major Ingeniería', {
                        shouldValidate: true,
                      })
                    } else {
                      setValue('staff.program', '', { shouldValidate: true })
                    }
                  }}
                >
                  <option value="" disabled hidden>
                    Selecciona una opción...
                  </option>
                  <option value="civil">Ingeniería Civil</option>
                  <option value="licc">LICC</option>
                  <option value="college">College Major Ingeniería</option>
                  <option value="otra">Otra</option>
                </select>
                <div className="min-h-[20px] mt-1">
                  {programChoice !== 'otra' && errors?.staff?.program && (
                    <p className="text-xs text-red-600 font-medium">
                      * {errors.staff.program.message}
                    </p>
                  )}
                </div>
              </div>

              {programChoice === 'otra' && (
                <TextField
                  label="Nombre de la Carrera"
                  placeholder="Ej: Ingeniería Comercial"
                  register={register}
                  errorMessage={errors?.staff?.program?.message}
                  prop="staff.program"
                />
              )}
              <NumberField
                label="Año de Ingreso"
                placeholder="Ej: 2023"
                register={register}
                errorMessage={errors?.staff?.entryYear?.message}
                prop="staff.entryYear"
              />
              <TextField
                label="Número de Alumno"
                placeholder="Si no eres alumno UC, déjalo vacío"
                register={register}
                errorMessage={errors?.staff?.studentNumber?.message}
                prop="staff.studentNumber"
              />
            </div>
            {/* --- SECCIÓN 3: POSTULACION A CURSOS --- */}
            <SectionTitle title="Elección de Postulación" />
            <p className="text-sm text-slate-500 mt-1">
              Selecciona el o los cargos a los que deseas postular:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {!loading &&
                !error &&
                courses.map(course => (
                  <div key={course.id} className="space-y-2">
                    <h4 className="font-medium text-slate-700">{course.name}</h4>
                    {course.openForDirectors && (
                      <CheckboxField
                        label={'Director(a)'}
                        value={`${course.id}_DIRECTOR`}
                        register={register}
                        prop="applications"
                      />
                    )}
                    {course.openForCoordinators && (
                      <CheckboxField
                        label={'Coordinador(a)'}
                        value={`${course.id}_COORDINATOR`}
                        register={register}
                        prop="applications"
                      />
                    )}
                    {course.openForManagers && (
                      <CheckboxField
                        label={'Encargado(a)'}
                        value={`${course.id}_MANAGER`}
                        register={register}
                        prop="applications"
                      />
                    )}
                    {course.openForTeachers && (
                      <CheckboxField
                        label={'Profesor(a)'}
                        value={`${course.id}_TEACHER`}
                        register={register}
                        prop="applications"
                      />
                    )}
                    {course.openForEditors && (
                      <CheckboxField
                        label={'Editor(a)'}
                        value={`${course.id}_EDITOR`}
                        register={register}
                        prop="applications"
                      />
                    )}
                    {course.openForMonitors && (
                      <CheckboxField
                        label={'Monitor(a)'}
                        value={`${course.id}_MONITOR`}
                        register={register}
                        prop="applications"
                      />
                    )}
                    {course.openForVolunteers && (
                      <CheckboxField
                        label={'Voluntario(a)'}
                        value={`${course.id}_VOLUNTEER`}
                        register={register}
                        prop="applications"
                      />
                    )}
                    {course.openForDesigners && (
                      <CheckboxField
                        label={'Diseñador(a)'}
                        value={`${course.id}_DESIGNER`}
                        register={register}
                        prop="applications"
                      />
                    )}
                    {course.openForDevelopers && (
                      <CheckboxField
                        label={'Desarrollador(a)'}
                        value={`${course.id}_DEVELOPER`}
                        register={register}
                        prop="applications"
                      />
                    )}
                  </div>
                ))}
            </div>

            {/* BOTÓN DE ENVÍO CENTRADO */}
            <div className="flex justify-center pt-6 mt-8 border-t border-sky-100">
              <div className="w-full md:w-1/2">
                <SubmitApplicationButton disabled={isSubmitting} />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default StaffApplication
