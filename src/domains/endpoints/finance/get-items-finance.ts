import { Finance } from '@/app/entities/finance'
import { server } from '@/utils/server'
import { t } from 'elysia'

const finance = new Finance()
export const getItemsFinance = server.get(
  '/finance/:id',
  async ({ params, status }) => {
    const { id } = params

    const financeData = await finance.getItemsFinance(id)

    if (!financeData) {
      return status(400, 'Bad Request')
    }

    return status(200, financeData)
  },
  {
    params: t.Object({
      id: t.String(),
    }),
  }
)
