import { z } from 'zod'

export const userSchema = z.object({
  name: z.string().min(1, { message: 'O nome é obrigatório.' }),
  email: z.string().email({ message: 'E-mail é obrigatório.' }),
  password: z
    .string()
    .min(6, { message: 'A senha deve ter no mínimo 6 caracteres.' }),
})

export type UserType = z.infer<typeof userSchema>
