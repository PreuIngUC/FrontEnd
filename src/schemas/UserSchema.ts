import { z } from 'zod'

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.uuid(),
  auth0Id: z.string().nullable(),
  rut: z
    .string()
    .trim()
    .toUpperCase()
    .regex(/^\d{7,8}-[\dK]$/, { message: 'Formato inválido' }),
  names: z.string().min(2).trim(),
  lastName0: z.string().min(2).trim(),
  lastName1: z.string().min(2).trim(),
  email: z.email().toLowerCase(),
  createdAt: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

export default UserSchema
