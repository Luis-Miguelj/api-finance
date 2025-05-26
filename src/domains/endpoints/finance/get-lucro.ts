import { server } from '@/utils/server'
import { Finance } from '@/app/entities/finance'
import { t } from 'elysia'

const finance = new Finance()
export const getLucro = server.get(
  '/finance/lucro/:id',
  async ({ params, status }) => {
    const { id } = params

    if (!id) {
      return status(400, 'ID is required.')
    }
    const financeData = await finance.getFinanceCompareLucro(id)
    if (!financeData) {
      return status(404, 'Finance data not found.')
    }

    return status(200, {
      message: financeData.message,
      lucro: financeData.lucro,
    })
  },
  {
    params: t.Object({
      id: t.String(),
    }),
    response: {
      200: t.Object({
        message: t.String(),
        lucro: t.Number(),
      }),
      400: t.String(),
      404: t.String(),
    },
  }
)
