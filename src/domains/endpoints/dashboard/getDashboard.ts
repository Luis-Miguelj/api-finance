import { server } from '@/utils/server'
import { Dashboard } from '@/app/entities/dashboard'
import { t } from 'elysia'

export const getDashboard = server.get(
  '/dashboard',
  async ({ status, request, jwt }) => {
    const dashboard = new Dashboard()
    const token = request.headers.get('Authorization')
    const verify = await jwt.verify(token as string)

    if (!verify) {
      return status(400, 'Bad Request')
    }

    const data = await dashboard.getDashboard(verify.sub as string)

    if (!data) {
      return status(404, 'Not Found')
    }

    return status(200, data)
  },
  {
    response: {
      200: t.Array(
        t.Object({
          month: t.String(),
          Entrada: t.Number(),
          Saida: t.Number(),
        })
      ),
      400: t.String(),
      404: t.String(),
    },
  }
)
