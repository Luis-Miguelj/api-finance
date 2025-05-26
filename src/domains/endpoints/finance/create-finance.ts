import { server } from '@/utils/server'
import { Finance } from '@/app/entities/finance'
import { t } from 'elysia'

const finance = new Finance()
export const createFinance = server.post(
  '/finance/:id',
  async ({ body, status, params }) => {
    const { id } = params
    const { entrada, saida } = body

    const registerFinance = await finance.createFinance({
      userId: id,
      entrada,
      saida,
    })

    if (!registerFinance) {
      return status(400, 'Bad Request')
    }

    return status(201, {
      message: registerFinance.message,
      data: {
        id: registerFinance.finance.id,
        userId: registerFinance.finance.userId,
        entrada: registerFinance.finance.entrada ?? 0,
        saida: registerFinance.finance.saida ?? 0,
        createdAt: registerFinance.finance.createdAt,
      },
    })
  },
  {
    params: t.Object({
      id: t.String(),
    }),
    body: t.Object({
      entrada: t.Optional(t.Number()),
      saida: t.Optional(t.Number()),
    }),
    response: {
      400: t.String(),
      201: t.Object({
        message: t.String(),
        data: t.Object({
          id: t.String(),
          userId: t.String(),
          entrada: t.Optional(t.Number()),
          saida: t.Optional(t.Number()),
          createdAt: t.Date(),
        }),
      }),
    },
  }
)
