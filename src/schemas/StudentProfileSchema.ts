import { z } from 'zod'
import { ApplicationStateSchema } from './ApplicationStateSchema.js'
import { EducationalLevelSchema } from './EducationalLevelSchema.ts'
import { SchoolTypeSchema } from './SchoolTypeSchema.ts'
import { SchoolDependencySchema } from './SchoolDependencySchema.ts'
import { ElectiveTestSchema } from './ElectiveTestSchema.ts'
import { TakesM2Schema } from './TakesM2Schema.ts'
import { RSHSectionSchema } from './RSHSectionSchema.ts'

/////////////////////////////////////////
// STUDENT PROFILE SCHEMA
/////////////////////////////////////////

export const StudentProfileSchema = z.object({
  applicationState: ApplicationStateSchema,
  educationalLevel: EducationalLevelSchema,
  schoolType: SchoolTypeSchema,
  schoolDependency: SchoolDependencySchema,
  electiveTest: ElectiveTestSchema,
  takesM2: TakesM2Schema,
  rshSection: RSHSectionSchema,
  id: z.uuid(),
  userId: z.uuid(),
  school: z.string(),
  residence: z
    .string()
    .trim()
    .min(1, { message: 'La comuna de residencia no puede estar vacía ni contener solo espacios.' }),
  targetProgram: z
    .string()
    .trim()
    .min(1, { message: 'La carrera no puede estar vacía ni contener solo espacios.' }),
  targetUniversity: z
    .string()
    .trim()
    .min(1, { message: 'La universidad no puede estar vacía ni contener solo espacios.' }),
  goalsAndPlans: z.string(),
  scheduleDifficulties: z.string().nullable(),
  avg1M: z.number().min(0.0).max(7.0),
  avg2M: z.number().min(0.0).max(7.0),
  avg3M: z.number().min(0.0).max(7.0),
  avg4M: z.number().min(0.0).max(7.0),
  familySize: z.number().int().positive({ message: 'Debe ser un valor positivo' }),
  totalMonthlyIncome: z.number().int().positive({ message: 'Debe ser un valor positivo' }),
  monthlyFoodExpenses: z.number().int().positive({ message: 'Debe ser un valor positivo' }),
  monthlyEducationExpenses: z.number().int().positive({ message: 'Debe ser un valor positivo' }),
  monthlyUtilitiesExpenses: z.number().int().positive({ message: 'Debe ser un valor positivo' }),
  monthlyTelecomExpenses: z.number().int().positive({ message: 'Debe ser un valor positivo' }),
  monthlyTransportationExpenses: z
    .number()
    .int()
    .positive({ message: 'Debe ser un valor positivo' }),
  monthlyHousingExpenses: z.number().int().positive({ message: 'Debe ser un valor positivo' }),
  monthlyHealthcareExpenses: z.number().int().positive({ message: 'Debe ser un valor positivo' }),
  monthlyMiscExpenses: z.number().int().positive({ message: 'Debe ser un valor positivo' }),
})

export type StudentProfile = z.infer<typeof StudentProfileSchema>

export default StudentProfileSchema
