import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { paths } from '../../../api/types.ts'
import { StudentApplicationDto } from '../../../schemas/UserApplications.ts'
import SubmitApplicationButton from '../../../components/buttons/SubmitApplicationButton.tsx'
import TextField from '../../../components/form/TextField.tsx'
import SelectField from '../../../components/form/SelectField.tsx'
import NumberField from '../../../components/form/NumberField.tsx'
import { useApi } from '../../../wrappers/ApiProvider.tsx'
import { useNavigate } from 'react-router-dom'
import type z from 'zod'
import * as selectFieldsOptions from '../../../constants/applications/students/SelectFieldsOptions.ts'

// --- Tipos ---
type BodyType =
  paths['/api/public/student/application']['post']['requestBody']['content']['application/json']

type FormType = z.input<typeof StudentApplicationDto>

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

function StudentApplication() {
  const api = useApi()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormType>({
    resolver: zodResolver(StudentApplicationDto),
    defaultValues: {
      user: {
        rut: '',
        email: '',
        names: '',
        lastName0: '',
        lastName1: '',
        pronouns: undefined,
        birthDate: undefined,
        phoneNumber: '',
      },
      student: {
        educationalLevel: undefined,
        school: '',
        schoolType: undefined,
        schoolDependency: undefined,
        residence: '',
        electiveTest: undefined,
        takesM2: undefined,
        targetProgram: '',
        targetUniversity: '',
        goalsAndPlans: '',
        scheduleDifficulties: '',
        avg1M: undefined,
        avg2M: undefined,
        avg3M: undefined,
        avg4M: undefined,
        rshSection: undefined,
        familySize: undefined,
        totalMonthlyIncome: undefined,
        monthlyFoodExpenses: undefined,
        monthlyEducationExpenses: undefined,
        monthlyUtilitiesExpenses: undefined,
        monthlyTelecomExpenses: undefined,
        monthlyTransportationExpenses: undefined,
        monthlyHousingExpenses: undefined,
        monthlyHealthcareExpenses: undefined,
        monthlyMiscExpenses: undefined,
      },
    },
  })

  const onSubmit = async (values: FormType) => {
    try {
      const bodyForm = mapFormToBody(values)
      await api.sendApplication(bodyForm)
      navigate('/application/submitted')
    } catch {
      navigate('/application/failed')
    }
  }

  return (
    <div className="min-h-screen bg-sky-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-sky-100">
        {/* ENCABEZADO DE LA TARJETA */}
        <div className="bg-blue-900 py-6 px-8 text-center sm:px-10">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Postulación Estudiante
          </h2>
          <p className="mt-2 text-sky-200 text-sm">
            Completa el formulario para ser parte del equipo.
          </p>
        </div>

        {/* CUERPO DEL FORMULARIO Y TEXTO INTRODUCTORIO */}
        <div className="py-8 px-8 sm:px-10">
          {/* --- BLOQUE DE INFORMACIÓN INICIAL --- */}
          <div className="mb-10 bg-slate-50 border border-slate-200 rounded-xl p-6 text-slate-700 shadow-sm">
            <p className="mb-5 text-base text-center md:text-left">
              El siguiente formulario tiene el objetivo de permitirte <strong>POSTULAR</strong> al
              preuniversitario social de ingeniería. Esta es una primera instancia de comunicación.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
              {/* Fechas */}
              <div className="bg-white p-4 rounded-lg border border-sky-100 shadow-sm">
                <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                  📅 Fechas Clave
                </h4>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>
                    <strong>Entrevistas presenciales:</strong> Entre el 16 y el 27 de marzo del
                    2026.{' '}
                    <span className="text-red-600 font-medium">Debe asistir con tutor legal.</span>
                  </li>
                  <li>
                    <strong>Inicio de clases:</strong> Lunes 30 de marzo del 2026.
                  </li>
                </ul>
              </div>

              {/* Info Preliminar */}
              <div className="bg-white p-4 rounded-lg border border-sky-100 shadow-sm">
                <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                  💡 Información Preliminar
                </h4>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>
                    <strong>No se cobra mensualidad.</strong> Solo se debe pagar una matrícula de
                    $15.000 pesos semestral.
                  </li>
                  <li>
                    El compromiso es fundamental: Nos reservamos el derecho de no renovar la
                    matrícula ante reiteradas <strong>inasistencias injustificadas</strong>.
                  </li>
                  <li>
                    La planificación considera ambos semestres, preparando para la PAES de verano
                    del 2027.
                  </li>
                </ul>
              </div>
            </div>

            <p className="text-center text-sm bg-sky-100 text-blue-900 py-3 rounded-lg font-medium">
              Frente a cualquier duda, escribir al correo:{' '}
              <a href="mailto:preu.ing@gmail.com" className="font-bold hover:underline">
                preu.ing@gmail.com
              </a>
            </p>
          </div>

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
                label="RUT"
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
                label="Email"
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
            <SectionTitle title="Antecedentes Académicos" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <SelectField
                label="Nivel Educacional"
                register={register}
                errorMessage={errors?.student?.educationalLevel?.message}
                prop="student.educationalLevel"
                options={selectFieldsOptions.educationalLevelOpts}
              />
              <TextField
                label="Colegio de Procedencia"
                register={register}
                errorMessage={errors?.student?.school?.message}
                prop="student.school"
              />
              <SelectField
                label="Tipo de Establecimiento"
                register={register}
                errorMessage={errors?.student?.schoolType?.message}
                prop="student.schoolType"
                options={selectFieldsOptions.schoolTypeOpts}
              />
              <SelectField
                label="Dependencia del Colegio"
                register={register}
                errorMessage={errors?.student?.schoolDependency?.message}
                prop="student.schoolDependency"
                options={selectFieldsOptions.schoolDependencyOpts}
              />
            </div>

            <div className="mb-6">
              <TextField
                label="¿En qué comuna resides actualmente?"
                placeholder="Ej: Puente Alto, Maipú, Santiago..."
                register={register}
                errorMessage={errors?.student?.residence?.message}
                prop="student.residence"
              />
            </div>

            <h4 className="text-md font-semibold text-blue-900 mb-4 mt-6">Promedios de Notas</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <NumberField
                label="1° Medio"
                register={register}
                errorMessage={errors?.student?.avg1M?.message}
                prop="student.avg1M"
                step="any"
              />
              <NumberField
                label="2° Medio"
                register={register}
                errorMessage={errors?.student?.avg2M?.message}
                prop="student.avg2M"
                step="any"
              />
              <NumberField
                label="3° Medio"
                register={register}
                errorMessage={errors?.student?.avg3M?.message}
                prop="student.avg3M"
                step="any"
              />
              <NumberField
                label="4° Medio (opc)"
                register={register}
                errorMessage={errors?.student?.avg4M?.message}
                prop="student.avg4M"
                step="any"
              />
            </div>

            {/* --- SECCIÓN 3: INTERESES Y OBJETIVOS --- */}
            <SectionTitle title="Intereses y Objetivos" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <SelectField
                label="Prueba Electiva a Rendir"
                register={register}
                errorMessage={errors?.student?.electiveTest?.message}
                prop="student.electiveTest"
                options={selectFieldsOptions.electiveTestOpts}
              />
              <SelectField
                label="¿Rendirás la prueba M2?"
                register={register}
                errorMessage={errors?.student?.takesM2?.message}
                prop="student.takesM2"
                options={selectFieldsOptions.takesM2Opts}
              />
              <TextField
                label="Carrera de Interés"
                register={register}
                errorMessage={errors?.student?.targetProgram?.message}
                prop="student.targetProgram"
              />
              <TextField
                label="Universidad de Interés"
                register={register}
                errorMessage={errors?.student?.targetUniversity?.message}
                prop="student.targetUniversity"
              />
            </div>

            <div className="space-y-6 mb-6">
              <TextField
                label="¿Cuáles son tus objetivos y planes para este año?"
                placeholder="Cuéntanos brevemente..."
                register={register}
                errorMessage={errors?.student?.goalsAndPlans?.message}
                prop="student.goalsAndPlans"
              />
              <TextField
                label="¿Tienes alguna dificultad de horario?"
                placeholder="Si/No, especifica..."
                register={register}
                errorMessage={errors?.student?.scheduleDifficulties?.message}
                prop="student.scheduleDifficulties"
              />
            </div>

            {/* --- SECCIÓN 4: ANTECEDENTES SOCIOECONÓMICOS --- */}
            <SectionTitle
              title="Antecedentes Socioeconómicos"
              description="Esta información es confidencial y nos ayuda a entender tu contexto."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <SelectField
                label="Tramo RSH"
                register={register}
                errorMessage={errors?.student?.rshSection?.message}
                prop="student.rshSection"
                options={selectFieldsOptions.rshSectionOpts}
              />
              <NumberField
                label="Integrantes del Hogar"
                register={register}
                errorMessage={errors?.student?.familySize?.message}
                prop="student.familySize"
              />
              <NumberField
                label="Ingreso Total Familiar"
                register={register}
                errorMessage={errors?.student?.totalMonthlyIncome?.message}
                prop="student.totalMonthlyIncome"
              />
            </div>

            <h4 className="text-md font-semibold text-blue-900 mb-4">Gastos Mensuales Estimados</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
              <NumberField
                label="Alimentación"
                register={register}
                prop="student.monthlyFoodExpenses"
                errorMessage={errors?.student?.monthlyFoodExpenses?.message}
              />
              <NumberField
                label="Educación"
                register={register}
                prop="student.monthlyEducationExpenses"
                errorMessage={errors?.student?.monthlyEducationExpenses?.message}
              />
              <NumberField
                label="Cuentas Básicas"
                register={register}
                prop="student.monthlyUtilitiesExpenses"
                errorMessage={errors?.student?.monthlyUtilitiesExpenses?.message}
              />
              <NumberField
                label="Telecomunicaciones"
                register={register}
                prop="student.monthlyTelecomExpenses"
                errorMessage={errors?.student?.monthlyTelecomExpenses?.message}
              />
              <NumberField
                label="Transporte"
                register={register}
                prop="student.monthlyTransportationExpenses"
                errorMessage={errors?.student?.monthlyTransportationExpenses?.message}
              />
              <NumberField
                label="Vivienda"
                register={register}
                prop="student.monthlyHousingExpenses"
                errorMessage={errors?.student?.monthlyHousingExpenses?.message}
              />
              <NumberField
                label="Salud"
                register={register}
                prop="student.monthlyHealthcareExpenses"
                errorMessage={errors?.student?.monthlyHealthcareExpenses?.message}
              />
              <NumberField
                label="Otros"
                register={register}
                prop="student.monthlyMiscExpenses"
                errorMessage={errors?.student?.monthlyMiscExpenses?.message}
              />
            </div>

            {/* BOTÓN DE ENVÍO CENTRADO */}
            <div className="flex justify-center pt-6 border-t border-sky-100">
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

export default StudentApplication
