import { z } from 'zod'

export const SchoolTypeSchema = z.enum(['CIENTIFICO_HUMANISTA', 'TECNICO_PROFESIONAL', 'ARTISTICO'])

export type SchoolTypeType = `${z.infer<typeof SchoolTypeSchema>}`

export default SchoolTypeSchema
