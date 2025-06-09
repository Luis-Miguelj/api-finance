import { User } from '@/app/entities/users'
import { server } from '@/utils/server'
import { t } from 'elysia'

const users = new User()

export const getUserId = server.get(
  '/users',
  async ({ status, jwt, request }) => {
    const token = request.headers.get('Authorization')
    const verify = await jwt.verify(token as string)
    if (!verify || !verify.sub) {
      return status(400, 'Token inválido ou expirado')
    }
    const user = await users.getUserById(verify.sub)

    if (!user || (!user.usuario && user.message)) {
      return status(404, user?.message || 'Usuário não encontrado')
    }

    if (user.usuario) {
      return status(200, {
        id: user.usuario.id,
        name: user.usuario.name,
        createdAt: user.usuario.createdAt,
      })
    }

    // Fallback (evita retornar undefined)
    return status(404, 'Usuário não encontrado')
  },
  {
    response: {
      400: t.String(),
      404: t.String(),
      200: t.Object({
        id: t.String(),
        name: t.String(),
        createdAt: t.Date(),
      }),
    },
  }
)
