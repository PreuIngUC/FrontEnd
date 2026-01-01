import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { paths } from '../api/types.ts'
import { StudentApplicationDto } from '../schemas/UserApplications.ts'
import SubmitApplicationButton from '../components/buttons/SubmitApplicationButton.tsx'
import TextField from '../components/form/TextField.tsx'

type BodyType =
  paths['/api/student/application']['post']['requestBody']['content']['application/json']

function StudentApplication() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BodyType>({
    resolver: zodResolver(StudentApplicationDto),
    mode: 'onBlur', //validar al salir del input
    defaultValues: {
      user: {
        rut: '',
        email: '',
        names: '',
        lastName0: '',
        lastName1: '',
      },
      student: {},
    },
  })
  const onSubmit = async (values: BodyType) => {
    //En esta parte va el comportamiento al mandar los datos listos
    console.log('Subido:', values)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Email"
        placeholder="Tu Email"
        register={register}
        error={errors?.user?.email}
        prop="user.email"
      />
      <SubmitApplicationButton disabled={isSubmitting} />
    </form>
  )
}

export default StudentApplication
