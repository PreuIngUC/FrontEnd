import { z } from 'zod'

export const SchoolDependencySchema = z.enum([
  'MUNICIPAL',
  'SUBVENCIONADO_O_ADMINISTRACION_DELEGADA',
  'PARTICULAR_PAGADO',
])

export type SchoolDependencyType = `${z.infer<typeof SchoolDependencySchema>}`

export default SchoolDependencySchema
