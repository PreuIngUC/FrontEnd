const { z } = require('zod');
const schema = z.object({
  name: z.string().min(1),
  startDate: z.string().nullable().optional(),
  endDate: z.string().nullable().optional(),
  openForTeachers: z.boolean(),
  openForCoordinators: z.boolean(),
  finished: z.boolean(),
});
console.log(schema.safeParse({
  name: "Curso",
  startDate: "",
  endDate: "",
  openForTeachers: true,
  openForCoordinators: false,
  finished: false
}));
