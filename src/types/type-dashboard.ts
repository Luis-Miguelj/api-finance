import { z } from 'zod'

export const dashboardSchema = z.object({
  month: z.date(),
  entrada: z.string(),
  saida: z.string(),
})

export type DashboardTypes = z.infer<typeof dashboardSchema>
