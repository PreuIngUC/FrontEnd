import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { paths } from '../api/types.ts'
import { StudentApplicationDto } from '../schemas/UserApplications.ts'

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
  return <></>
}

export default StudentApplication
