import { z } from 'zod'

export const ElectiveTestSchema = z.enum(['BIOLOGIA', 'FISICA', 'QUIMICA', 'HISTORIA', 'TECNICO'])

export type ElectiveTestType = `${z.infer<typeof ElectiveTestSchema>}`

export default ElectiveTestSchema
