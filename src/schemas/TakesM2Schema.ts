import { z } from 'zod'

export const TakesM2Schema = z.enum(['SI', 'NO', 'AUN_NO_SE'])

export type TakesM2Type = `${z.infer<typeof TakesM2Schema>}`

export default TakesM2Schema
