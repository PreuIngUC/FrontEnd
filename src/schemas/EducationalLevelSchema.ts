import { z } from 'zod'

export const EducationalLevelSchema = z.enum([
  'PRIMERO_MEDIO',
  'SEGUNDO_MEDIO',
  'TERCERO_MEDIO',
  'CUARTO_MEDIO',
  'EGRESADO',
])

export type EducationalLevelType = `${z.infer<typeof EducationalLevelSchema>}`

export default EducationalLevelSchema
