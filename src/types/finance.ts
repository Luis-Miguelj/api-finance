import { z } from 'zod'

export const financeSchema = z.object({
  userId: z.string(),
  description: z.string(),
  type: z.string(),
  value: z.number(),
})

export type Finance = z.infer<typeof financeSchema>
