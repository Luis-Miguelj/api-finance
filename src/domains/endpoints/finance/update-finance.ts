import { server } from '@/utils/server'
import { Finance } from '@/app/entities/finance'
import { t } from 'elysia'

const finance = new Finance()
export const updateFinance = server.put(
  '/finance/:id',
  async ({ params, body, status }) => {
    const { id } = params
    const { entrada, saida } = body

    if (!id) {
      return status(400, 'ID é obrigatório')
    }

    if ((entrada ?? 0) < 0 && (saida ?? 0) < 0) {
      return status(400, 'Números invalidos')
    }

    const financeData = await finance.updateFinance(
      id,
      entrada ?? 0,
      saida ?? 0
    )

    if (!financeData) {
      return status(400, 'Erro ao atualizar os dados')
    }

    return status(200, financeData.message)
  },
  {
    params: t.Object({
      id: t.String(),
    }),
    body: t.Object({
      entrada: t.Optional(t.Number({ error: 'Entrada deve ser um número' })),
      saida: t.Optional(t.Number({ error: 'Saída deve ser um número' })),
    }),
    response: {
      200: t.String(),
      400: t.String(),
    },
  }
)
