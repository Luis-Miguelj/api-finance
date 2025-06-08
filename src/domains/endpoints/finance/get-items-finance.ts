import { Finance } from '@/app/entities/finance'
import { server } from '@/utils/server'
import { t } from 'elysia'

const finance = new Finance()
export const getItemsFinance = server.get(
  '/finance/items',
  async ({ status, request, jwt }) => {
    const token = request.headers.get('Authorization')
    const verify = await jwt.verify(token as string)
    if (!verify) {
      return status(400, 'Bad Request')
    }
    if (!verify.sub) {
      return status(400, 'Bad Request')
    }

    const financeData = await finance.getItemsFinance(verify.sub)

    if (!financeData) {
      return status(400, 'Bad Request')
    }

    return status(200, financeData.items)
  },
  {
    response: {
      200: t.Array(
        t.Object({
          description: t.String(),
          type: t.String(),
          value: t.Number(),
          createdAt: t.Date(),
        })
      ),
      400: t.String(),
    },
  }
)
