import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { paths } from '../../../api/types.ts'
import { StudentApplicationDto } from '../../../schemas/UserApplications.ts'
import SubmitApplicationButton from '../../../components/buttons/SubmitApplicationButton.tsx'
import TextField from '../../../components/form/TextField.tsx'
import SelectField from '../../../components/form/SelectField.tsx'
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
        birthDate: '',
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
        error={errors?.user?.names}
        prop="user.names"
      />
      <TextField
        label="Apellido Paterno"
        register={register}
        error={errors?.user?.lastName0}
        prop="user.lastName0"
      />
      <TextField
        label="Apellido Materno"
        register={register}
        error={errors?.user?.lastName1}
        prop="user.lastName1"
      />
      <SelectField
        label="Pronombres"
        register={register}
        error={errors?.user?.pronouns}
        prop="user.pronouns"
        options={selectFieldsOptions.pronounsOpts}
      />
      <TextField
        label="RUT (sin puntos y con guión)"
        placeholder="XXXXXXXX-X"
        register={register}
        error={errors?.user?.rut}
        prop="user.rut"
      />
      {/* TODO: agregar fecha de nacimiento */}
      <TextField
        label="Número de teléfono"
        placeholder="+569XXXXXXXX"
        register={register}
        error={errors?.user?.phoneNumber}
        prop="user.phoneNumber"
      />
      <TextField
        label="Email"
        placeholder="Tu Email"
        register={register}
        error={errors?.user?.email}
        prop="user.email"
      />
      <TextField
        label="Confirma tu Email"
        placeholder="Tu Email"
        register={register}
        error={errors?.user?.confirmEmail}
        prop="user.confirmEmail"
      />
      <SelectField
        label="Curso"
        register={register}
        error={errors?.student?.educationalLevel}
        prop="student.educationalLevel"
        options={selectFieldsOptions.educationalLevelOpts}
      />
      <TextField
        label="Colegio"
        placeholder="Tu Colegio"
        register={register}
        error={errors?.student?.school}
        prop="student.school"
      />
      <SelectField
        label="¿A qué tipo de colegio asistes o asististe?"
        register={register}
        error={errors?.student?.schoolType}
        prop="student.schoolType"
        options={selectFieldsOptions.schoolTypeOpts}
      />
      <SelectField
        label="¿Cuál es la dependencia del colegio al que asistes o asististe?"
        register={register}
        error={errors?.student?.schoolDependency}
        prop="student.schoolDependency"
        options={selectFieldsOptions.schoolDependencyOpts}
      />
      <TextField
        label="¿En qué comuna resides?"
        placeholder="Tu Comuna"
        register={register}
        error={errors?.student?.residence}
        prop="student.residence"
      />
      <SelectField
        label="¿Qué prueba electiva deseas rendir?"
        register={register}
        error={errors?.student?.electiveTest}
        prop="student.electiveTest"
        options={selectFieldsOptions.electiveTestOpts}
      />
      <SelectField
        label="¿Rendirás la prueba M2?\n(prueba necesaria para entrar a carreras científicas como ingeniería, física, matemáticas, entre otras)"
        register={register}
        error={errors?.student?.takesM2}
        prop="student.takesM2"
        options={selectFieldsOptions.takesM2Opts}
      />
      <TextField
        label="¿A qué carrera te gustaría ingresar?"
        placeholder=""
        register={register}
        error={errors?.student?.targetProgram}
        prop="student.targetProgram"
      />
      <TextField
        label="¿A qué universidad te gustaría ingresar?"
        placeholder=""
        register={register}
        error={errors?.student?.targetUniversity}
        prop="student.targetUniversity"
      />
      <TextField
        label="¿Cuáles son tus objetivos y planes para este año? ¿Cómo se relacionan con el preu?"
        placeholder=""
        register={register}
        error={errors?.student?.goalsAndPlans}
        prop="student.goalsAndPlans"
      />
      <TextField
        label="¿Tienes alguna dificultad con el horario y/o modalidad de las clases?"
        placeholder=""
        register={register}
        error={errors?.student?.scheduleDifficulties}
        prop="student.scheduleDifficulties"
      />
      <TextField
        label="Promedio 1° Medio"
        placeholder=""
        register={register}
        error={errors?.student?.avg1M}
        prop="student.avg1M"
      />
      <TextField
        label="Promedio 2° Medio"
        placeholder=""
        register={register}
        error={errors?.student?.avg2M}
        prop="student.avg2M"
      />
      <TextField
        label="Promedio 3° Medio"
        placeholder=""
        register={register}
        error={errors?.student?.avg3M}
        prop="student.avg3M"
      />
      {/* TODO: revisar si programé bien la DB para resivir 0's aparte de positivos */}
      <TextField
        label="Promedio 4° Medio (Pon un 0 si no tienes aún)"
        placeholder=""
        register={register}
        error={errors?.student?.avg4M}
        prop="student.avg4M"
      />
      <SelectField
        label="¿En qué tramo del RSH te encuentras?"
        register={register}
        error={errors?.student?.rshSection}
        prop="student.rshSection"
        options={selectFieldsOptions.rshSectionOpts}
      />
      <TextField
        label="¿Cuántas personas viven en tu hogar? (incluyéndote)"
        placeholder=""
        register={register}
        error={errors?.student?.familySize}
        prop="student.familySize"
      />
      <TextField
        label="¿Cuál es la suma total de ingresos en tu hogar?"
        placeholder=""
        register={register}
        error={errors?.student?.totalMonthlyIncome}
        prop="student.totalMonthlyIncome"
      />
      <TextField
        label="Alimentación"
        placeholder=""
        register={register}
        error={errors?.student?.monthlyFoodExpenses}
        prop="student.monthlyFoodExpenses"
      />
      <TextField
        label="Educación"
        placeholder=""
        register={register}
        error={errors?.student?.monthlyEducationExpenses}
        prop="student.monthlyEducationExpenses"
      />
      <TextField
        label="Agua y Luz"
        placeholder=""
        register={register}
        error={errors?.student?.monthlyUtilitiesExpenses}
        prop="student.monthlyUtilitiesExpenses"
      />
      <TextField
        label="Telefonía, Internet y Cable"
        placeholder=""
        register={register}
        error={errors?.student?.monthlyTelecomExpenses}
        prop="student.monthlyTelecomExpenses"
      />
      <TextField
        label="Movilización"
        placeholder=""
        register={register}
        error={errors?.student?.monthlyTransportationExpenses}
        prop="student.monthlyTransportationExpenses"
      />
      <TextField
        label="Vivienda"
        placeholder=""
        register={register}
        error={errors?.student?.monthlyHousingExpenses}
        prop="student.monthlyHousingExpenses"
      />
      <TextField
        label="Salud"
        placeholder=""
        register={register}
        error={errors?.student?.monthlyHealthcareExpenses}
        prop="student.monthlyHealthcareExpenses"
      />
      <TextField
        label="Otros"
        placeholder=""
        register={register}
        error={errors?.student?.monthlyMiscExpenses}
        prop="student.monthlyMiscExpenses"
      />
      <SubmitApplicationButton disabled={isSubmitting} />
    </form>
  )
}

export default StudentApplication
