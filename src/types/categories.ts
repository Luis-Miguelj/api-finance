import { z } from 'zod'

export const categoriesSchema = z.object({
  userId: z.string().uuid(),
  name: z
    .string()
    .min(1, 'Name is required')
    .max(50, 'Name must be less than 50 characters'),
})

export type categoriesTypes = z.infer<typeof categoriesSchema>
