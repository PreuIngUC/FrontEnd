import { z } from 'zod'
import { PronounsSchema } from './PronounsSchema.ts'

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  pronouns: PronounsSchema,
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
  birthDate: z.coerce.date(),
  phoneNumber: z
    .string()
    .trim()
    .regex(/^\+\d{11}$/, {
      message: 'El teléfono debe ser + seguido de 11 dígitos (ej: +56912345678)',
    }),
})

export type User = z.infer<typeof UserSchema>

export default UserSchema
