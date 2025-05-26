import { server } from '@/utils/server'
import { User } from '@/app/entities/users'
import { t } from 'elysia'

const users = new User()

export const login = server.post(
  '/auth/login',
  async ({ body, jwt, status }) => {
    const { email, password } = body

    const { user, message } = await users.login({ email, password })

    if (!user) {
      return status(401, message)
    }

    const token = await jwt.sign({ sub: user.id })

    if (!token) {
      return status(500, 'Erro ao gerar o token')
    }

    return status(200, {
      message: 'Login realizado com sucesso',
      token,
    })
  },
  {
    body: t.Object({
      email: t.String(),
      password: t.String(),
    }),
    response: {
      200: t.Object({
        message: t.String(),
        token: t.String(),
      }),
      401: t.String(),
      500: t.String(),
    },
  }
)
