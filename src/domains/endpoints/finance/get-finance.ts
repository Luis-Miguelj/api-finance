import { server } from '@/utils/server'
import { Finance } from '@/app/entities/finance'
import { t } from 'elysia'

const finance = new Finance()
export const getFinance= server.get(
  '/finance/values',
  async ({ status, jwt, request }) => {
    const token = request.headers.get('Authorization')
    const verify = await jwt.verify(token as string)
    if (!verify) {
      return status(400, 'Bad Request')
    }
    if (!verify.sub) {
      return status(400, 'Bad Request')
    }

    console.log('verify', verify)

    const financeData = await finance.getFinance(verify.sub)
    if (!financeData) {
      return status(404, 'Finance not found')
    }
    return status(200, {
      // id: financeData
      entradas: financeData.entradas ?? 0,
      saidas: financeData.saidas ?? 0,
    })
  },
  {
    response: {
      200: t.Object({
        entradas: t.Optional(t.Number()),
        saidas: t.Optional(t.Number()),
      }),
      400: t.String(),
      404: t.String(),
    },
  }
)
