import { z } from 'zod'

export const PronounsSchema = z.enum(['EL_LO', 'ELLA_LA', 'ELLE_LE'])

export type PronounsType = `${z.infer<typeof PronounsSchema>}`

export default PronounsSchema
