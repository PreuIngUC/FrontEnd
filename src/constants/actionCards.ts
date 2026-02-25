import Permissions from './permissions.ts'

export type ActionCardProps = {
  id: string
  title: string
  description: string
  to: string
  icon?: string
  permissions?: Permissions[]
}

export const actionCards: ActionCardProps[] = [
  {
    id: 'staffApplications',
    title: 'Postulaciones al Equipo',
    description: 'Revisar y aceptar o rechazar postulaciones al equipo del Preu.',
    to: '/staff/applications',
    permissions: [Permissions.ReadStaffApplications, Permissions.AcceptStaffApplications],
  },
  {
    id: 'studentApplications',
    title: 'Postulaciones a Estudiante',
    description: 'Revisar y aceptar o rechazar postulaciones de potenciales estudiantes.',
    to: '/student/applications',
    permissions: [Permissions.ReadStudentApplications, Permissions.AcceptStudentApplications],
  },
  {
    id: 'acceptedStaff',
    title: 'Equipo Aceptado',
    description: 'Deshacer aceptación o crear cuentas en masa a postulantes al equipo.',
    to: '/staff/accepted',
    permissions: [Permissions.CreateStaffUsers],
  },
  {
    id: 'acceptedStudents',
    title: 'Estudiantes Aceptados',
    description: 'Deshacer aceptación o crear cuentas en masa a estudiantes aceptados.',
    to: '/students/accepted',
    permissions: [Permissions.CreateStudentUsers],
  },
]
