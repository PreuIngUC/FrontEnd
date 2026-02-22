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

type BodyType =
  paths['/api/public/student/application']['post']['requestBody']['content']['application/json']

type FormType = z.input<typeof StudentApplicationDto>

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
      //En esta parte va el comportamiento al mandar los datos listos
      const bodyForm = mapFormToBody(values)
      await api.sendApplication(bodyForm)
      // console.log('Subido:', bodyForm)
      navigate('/application/submitted')
    } catch {
      navigate('/application/failed')
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
      <SelectField
        label="Pronombres"
        register={register}
        errorMessage={errors?.user?.pronouns?.message}
        prop="user.pronouns"
        options={selectFieldsOptions.pronounsOpts}
      />
      <TextField
        label="RUT (sin puntos y con guión)"
        placeholder="XXXXXXXX-X"
        register={register}
        errorMessage={errors?.user?.rut?.message}
        prop="user.rut"
      />
      <TextField
        label="Fecha de Nacimiento"
        type="date"
        placeholder=""
        register={register}
        errorMessage={errors?.user?.birthDate?.message}
        prop="user.birthDate"
      />
      <TextField
        label="Número de teléfono"
        placeholder="+569XXXXXXXX"
        register={register}
        errorMessage={errors?.user?.phoneNumber?.message}
        prop="user.phoneNumber"
      />
      <TextField
        label="Email"
        placeholder="Tu Email"
        register={register}
        errorMessage={errors?.user?.email?.message}
        prop="user.email"
      />
      <TextField
        label="Confirma tu Email"
        placeholder="Tu Email"
        register={register}
        errorMessage={errors?.user?.confirmEmail?.message}
        prop="user.confirmEmail"
      />
      <SelectField
        label="Curso"
        register={register}
        errorMessage={errors?.student?.educationalLevel?.message}
        prop="student.educationalLevel"
        options={selectFieldsOptions.educationalLevelOpts}
      />
      <TextField
        label="Colegio"
        placeholder="Tu Colegio"
        register={register}
        errorMessage={errors?.student?.school?.message}
        prop="student.school"
      />
      <SelectField
        label="¿A qué tipo de colegio asistes o asististe?"
        register={register}
        errorMessage={errors?.student?.schoolType?.message}
        prop="student.schoolType"
        options={selectFieldsOptions.schoolTypeOpts}
      />
      <SelectField
        label="¿Cuál es la dependencia del colegio al que asistes o asististe?"
        register={register}
        errorMessage={errors?.student?.schoolDependency?.message}
        prop="student.schoolDependency"
        options={selectFieldsOptions.schoolDependencyOpts}
      />
      <TextField
        label="¿En qué comuna resides?"
        placeholder="Tu Comuna"
        register={register}
        errorMessage={errors?.student?.residence?.message}
        prop="student.residence"
      />
      <SelectField
        label="¿Qué prueba electiva deseas rendir?"
        register={register}
        errorMessage={errors?.student?.electiveTest?.message}
        prop="student.electiveTest"
        options={selectFieldsOptions.electiveTestOpts}
      />
      <SelectField
        label="¿Rendirás la prueba M2?\n(prueba necesaria para entrar a carreras científicas como ingeniería, física, matemáticas, entre otras)"
        register={register}
        errorMessage={errors?.student?.takesM2?.message}
        prop="student.takesM2"
        options={selectFieldsOptions.takesM2Opts}
      />
      <TextField
        label="¿A qué carrera te gustaría ingresar?"
        placeholder=""
        register={register}
        errorMessage={errors?.student?.targetProgram?.message}
        prop="student.targetProgram"
      />
      <TextField
        label="¿A qué universidad te gustaría ingresar?"
        placeholder=""
        register={register}
        errorMessage={errors?.student?.targetUniversity?.message}
        prop="student.targetUniversity"
      />
      <TextField
        label="¿Cuáles son tus objetivos y planes para este año? ¿Cómo se relacionan con el preu?"
        placeholder=""
        register={register}
        errorMessage={errors?.student?.goalsAndPlans?.message}
        prop="student.goalsAndPlans"
      />
      <TextField
        label="¿Tienes alguna dificultad con el horario y/o modalidad de las clases?"
        placeholder=""
        register={register}
        errorMessage={errors?.student?.scheduleDifficulties?.message}
        prop="student.scheduleDifficulties"
      />
      <NumberField
        label="Promedio 1° Medio"
        placeholder=""
        register={register}
        errorMessage={errors?.student?.avg1M?.message}
        prop="student.avg1M"
        step="any"
      />
      <NumberField
        label="Promedio 2° Medio"
        placeholder=""
        register={register}
        errorMessage={errors?.student?.avg2M?.message}
        prop="student.avg2M"
        step="any"
      />
      <NumberField
        label="Promedio 3° Medio"
        placeholder=""
        register={register}
        errorMessage={errors?.student?.avg3M?.message}
        prop="student.avg3M"
        step="any"
      />
      {/* TODO: revisar si programé bien la DB para resivir 0's aparte de positivos */}
      <NumberField
        label="Promedio 4° Medio (Pon un 0 si no tienes aún)"
        placeholder=""
        register={register}
        errorMessage={errors?.student?.avg4M?.message}
        prop="student.avg4M"
        step="any"
      />
      <SelectField
        label="¿En qué tramo del RSH te encuentras?"
        register={register}
        errorMessage={errors?.student?.rshSection?.message}
        prop="student.rshSection"
        options={selectFieldsOptions.rshSectionOpts}
      />
      <NumberField
        label="¿Cuántas personas viven en tu hogar? (incluyéndote)"
        placeholder=""
        register={register}
        errorMessage={errors?.student?.familySize?.message}
        prop="student.familySize"
      />
      <NumberField
        label="¿Cuál es la suma total de ingresos en tu hogar?"
        placeholder=""
        register={register}
        errorMessage={errors?.student?.totalMonthlyIncome?.message}
        prop="student.totalMonthlyIncome"
      />
      <NumberField
        label="Alimentación"
        placeholder=""
        register={register}
        errorMessage={errors?.student?.monthlyFoodExpenses?.message}
        prop="student.monthlyFoodExpenses"
      />
      <NumberField
        label="Educación"
        placeholder=""
        register={register}
        errorMessage={errors?.student?.monthlyEducationExpenses?.message}
        prop="student.monthlyEducationExpenses"
      />
      <NumberField
        label="Agua y Luz"
        placeholder=""
        register={register}
        errorMessage={errors?.student?.monthlyUtilitiesExpenses?.message}
        prop="student.monthlyUtilitiesExpenses"
      />
      <NumberField
        label="Telefonía, Internet y Cable"
        placeholder=""
        register={register}
        errorMessage={errors?.student?.monthlyTelecomExpenses?.message}
        prop="student.monthlyTelecomExpenses"
      />
      <NumberField
        label="Movilización"
        placeholder=""
        register={register}
        errorMessage={errors?.student?.monthlyTransportationExpenses?.message}
        prop="student.monthlyTransportationExpenses"
      />
      <NumberField
        label="Vivienda"
        placeholder=""
        register={register}
        errorMessage={errors?.student?.monthlyHousingExpenses?.message}
        prop="student.monthlyHousingExpenses"
      />
      <NumberField
        label="Salud"
        placeholder=""
        register={register}
        errorMessage={errors?.student?.monthlyHealthcareExpenses?.message}
        prop="student.monthlyHealthcareExpenses"
      />
      <NumberField
        label="Otros"
        placeholder=""
        register={register}
        errorMessage={errors?.student?.monthlyMiscExpenses?.message}
        prop="student.monthlyMiscExpenses"
      />
      <SubmitApplicationButton disabled={isSubmitting} />
    </form>
  )
}

export default StudentApplication
