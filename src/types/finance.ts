import { z } from 'zod'

export const financeSchema = z.object({
  userId: z.string(),
  entrada: z.number().optional() ?? z.null(),
  saida: z.number().optional() ?? z.null(),
})

export type Finance = z.infer<typeof financeSchema>
