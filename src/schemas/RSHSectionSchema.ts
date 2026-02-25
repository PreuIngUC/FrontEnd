import { z } from 'zod'

export const RSHSectionSchema = z.enum([
  'FROM_0_TO_40',
  'FROM_41_TO_50',
  'FROM_51_TO_60',
  'FROM_61_TO_70',
  'FROM_71_TO_80',
  'FROM_81_TO_90',
  'FROM_91_TO_100',
  'DOESNT_HAVE',
])

export type RSHSectionType = `${z.infer<typeof RSHSectionSchema>}`

export default RSHSectionSchema
