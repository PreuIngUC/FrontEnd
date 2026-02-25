import { z } from 'zod'

export const ApplicationStateSchema = z.enum([
  'PENDING_AS_STUDENT',
  'PENDING_AS_STAFF',
  'ACCEPTED_AS_STUDENT',
  'ACCEPTED_AS_STAFF',
  'CREATED',
  'REJECTED_AS_STAFF',
  'REJECTED_AS_STUDENT',
  'ACTIVE',
])

export type ApplicationStateType = `${z.infer<typeof ApplicationStateSchema>}`

export default ApplicationStateSchema
