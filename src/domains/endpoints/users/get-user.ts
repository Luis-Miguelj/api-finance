import { User } from '@/app/entities/users'
import { server } from '@/utils/server'
import { t } from 'elysia'

const users = new User()
export const getUser = server.get(
  '/users',
  async ({ status }) => {
    const user = await users.getAllUsers()
    if (user.message) {
      return status(404, user.message)
    }
    if (user.usuarios) {
      return status(200, user.usuarios)
    }

    return status(500, 'Erro ao buscar usuários')
  },
  {
    response: {
      404: t.String(),
      200: t.Array(
        t.Object({
          id: t.String(),
          name: t.String(),
          email: t.String(),
          password: t.String(),
          createdAt: t.Date(),
        })
      ),
      500: t.String(),
    },
  }
)
