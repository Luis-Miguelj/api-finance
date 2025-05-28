import { Finance } from '@/app/entities/finance'
import { server } from '@/utils/server'
import { t } from 'elysia'
const finance = new Finance()
export const deleteFinance = server.delete(
  '/finance/:id',
  async ({ params, status }) => {
    const { id } = params

    if (!id) {
      return status(400, 'ID é obrigatório')
    }

    const financeData = await finance.deleteFinance(id)

    if (!financeData) {
      return status(400, 'Erro ao deletar os dados')
    }

    return status(200, 'Dados deletados com sucesso')
  },
  {
    params: t.Object({
      id: t.String(),
    }),
    response: {
      200: t.String(),
      400: t.String(),
    },
  }
)
