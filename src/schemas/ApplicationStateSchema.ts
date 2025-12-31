import { z } from 'zod'

export const ApplicationStateSchema = z.enum(['PENDING', 'ACCEPTED', 'REJECTED'])

export type ApplicationStateType = `${z.infer<typeof ApplicationStateSchema>}`

export default ApplicationStateSchema
