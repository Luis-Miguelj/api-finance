import { server } from '@/utils/server'
import { Finance } from '@/app/entities/finance'
import { t } from 'elysia'

const finance = new Finance()
export const getFinanceEntradas = server.get(
  '/finance/values/:id',
  async ({ params, status }) => {
    const { id } = params
    if (!id) {
      return status(400, 'Bad Request')
    }
    const financeData = await finance.getFinance(id)
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
    params: t.Object({
      id: t.String(),
    }),
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
