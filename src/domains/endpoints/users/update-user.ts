import { User } from '@/app/entities/users'
import { server } from '@/utils/server'
import { t } from 'elysia'

const users = new User()
export const updateUser = server.put(
  '/users/:id',
  async ({ body, status, params }) => {
    const { id } = params
    const { name, email, password } = body

    if (!id) {
      return status(400, 'Bad Request: ID do usuário é obrigatório')
    }

    const updateUser = await users.updateUser(id, {
      name,
      email,
      password,
    })

    if (!updateUser) {
      return status(400, 'Erro ao atualizar usuário')
    }

    return status(200, {
      message: 'Usuário atualizado com sucesso',
    })
  },
  {
    params: t.Object({
      id: t.String(),
    }),
    body: t.Object({
      name: t.Optional(t.String()),
      email: t.Optional(t.String()),
      password: t.Optional(t.String()),
    }),
    response: {
      400: t.String(),
      200: t.Object({
        message: t.String(),
      }),
    },
  }
)
