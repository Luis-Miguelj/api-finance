import { User } from '@/app/entities/users'
import { server } from '@/utils/server'
import { t } from 'elysia'

const users = new User()

export const getUserId = server.get(
  '/users/:id',
  async ({ params, status }) => {
    const { id } = params
    const user = await users.getUserById(id)

    if (!user || (!user.usuario && user.message)) {
      return status(404, user?.message || 'Usuário não encontrado')
    }

    if (user.usuario) {
      return status(200, user.usuario)
    }

    // Fallback (evita retornar undefined)
    return status(404, 'Usuário não encontrado')
  },
  {
    params: t.Object({
      id: t.String(),
    }),
    response: {
      404: t.String(),
      200: t.Object({
        id: t.String(),
        name: t.String(),
        email: t.String(),
        password: t.String(),
        createdAt: t.Date(),
      }),
    },
  }
)
