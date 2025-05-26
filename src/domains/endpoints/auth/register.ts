import { userSchema } from '@/types/users'
import { server } from '@/utils/server'
import { t } from 'elysia'
import { User } from '@/app/entities/users'

const users = new User()
export const register = server.post(
  '/auth/register',
  async ({ body, jwt, status }) => {
    const { name, email, password } = userSchema.parse(body)
    const user = await users.create({
      name,
      email,
      password,
    })

    if (!user.usuario && user.message) {
      return status(400, user.message)
    }

    const token = await jwt.sign({
      sub: user.usuario?.id as string,
    })

    if (!token) {
      return status(500, 'Erro ao gerar o token')
    }

    if (user.usuario) {
      return status(201, {
        message: user.message,
        user: user.usuario,
        token,
      })
    }
  },
  {
    body: t.Object({
      name: t.String({
        minLength: 1,
        error: 'O nome é obrigatório.',
      }),
      email: t.String(),
      password: t.String({
        minLength: 6,
        error: 'A senha deve ter no mínimo 6 caracteres.',
      }),
    }),
    response: {
      201: t.Object({
        message: t.String(),
        user: t.Object({
          id: t.String(),
          name: t.String(),
          email: t.String(),
          password: t.String(),
          createdAt: t.Date(),
        }),
        token: t.String(),
      }),
      400: t.String(),
      500: t.String(),
    },
  }
)
