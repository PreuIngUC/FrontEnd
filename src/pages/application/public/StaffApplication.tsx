function StaffApplication() {
  return <div>No estamos recibiendo postulaciones al equipo todavía.</div>
}

export default StaffApplication

// import { useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
// import type { paths } from '../../../api/types.ts'
// import { StaffApplicationDto } from '../../../schemas/UserApplications.ts'
// import type { StaffApplicationDtoType } from '../../../schemas/UserApplications.ts'
// import SubmitApplicationButton from '../../../components/buttons/SubmitApplicationButton.tsx'
// import TextField from '../../../components/form/TextField.tsx'
// import { useApi } from '../../../wrappers/ApiProvider.tsx'
// import { useNavigate } from 'react-router-dom'

// type BodyType =
//   paths['/api/public/staff/application']['post']['requestBody']['content']['application/json']

// type FormType = StaffApplicationDtoType

// function mapFormToBody(values: FormType): BodyType {
//   const { confirmEmail, ...user } = values.user
//   void confirmEmail
//   return {
//     ...values,
//     user,
//   }
// }
// //TODO: modularizar comportamiento comun entre student y staff
// function StaffApplication() {
//   const api = useApi()
//   const navigate = useNavigate()
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm<FormType>({
//     resolver: zodResolver(StaffApplicationDto),
//     defaultValues: {
//       user: {
//         rut: '',
//         email: '',
//         names: '',
//         lastName0: '',
//         lastName1: '',
//       },
//       staff: {},
//     },
//   })
//   const onSubmit = async (values: FormType) => {
//     try {
//       const bodyForm = mapFormToBody(values)
//       await api.sendApplication(bodyForm)
//       console.log('Subido:', bodyForm)
//       navigate('/application/submitted')
//     } catch (err) {
//       console.error(err)
//       navigate('/application/failed')
//     }
//   }
//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <TextField
//         label="RUT (sin puntos y con guión)"
//         placeholder="XXXXXXXX-X"
//         register={register}
//         error={errors?.user?.rut}
//         prop="user.rut"
//       />
//       <TextField
//         label="Nombres"
//         register={register}
//         error={errors?.user?.names}
//         prop="user.names"
//       />
//       <TextField
//         label="Apellido Paterno"
//         register={register}
//         error={errors?.user?.lastName0}
//         prop="user.lastName0"
//       />
//       <TextField
//         label="Apellido Materno"
//         register={register}
//         error={errors?.user?.lastName1}
//         prop="user.lastName1"
//       />
//       <TextField
//         label="Email"
//         placeholder="Tu Email"
//         register={register}
//         error={errors?.user?.email}
//         prop="user.email"
//       />
//       <TextField
//         label="Confirma tu Email"
//         placeholder="Tu Email"
//         register={register}
//         error={errors?.user?.confirmEmail}
//         prop="user.confirmEmail"
//       />
//       <SubmitApplicationButton disabled={isSubmitting} />
//     </form>
//   )
// }

// export default StaffApplication
