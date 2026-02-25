import { z } from 'zod'
import { ApplicationStateSchema } from './ApplicationStateSchema.js'

/////////////////////////////////////////
// STAFF PROFILE SCHEMA
/////////////////////////////////////////

export const StaffProfileSchema = z.object({
  applicationState: ApplicationStateSchema,
  id: z.uuid(),
  userId: z.string(),
})

export type StaffProfile = z.infer<typeof StaffProfileSchema>

export default StaffProfileSchema
