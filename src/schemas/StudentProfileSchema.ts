import { z } from 'zod'
import { ApplicationStateSchema } from './ApplicationStateSchema.js'

/////////////////////////////////////////
// STUDENT PROFILE SCHEMA
/////////////////////////////////////////

export const StudentProfileSchema = z.object({
  applicationState: ApplicationStateSchema,
  id: z.uuid(),
  userId: z.uuid(),
})

export type StudentProfile = z.infer<typeof StudentProfileSchema>

export default StudentProfileSchema
