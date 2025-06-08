import { server } from '@/utils/server'
import { Finance } from '@/app/entities/finance'
import { t } from 'elysia'

const finance = new Finance()
export const createFinance = server.post(
  '/finance',
  async ({ body, status, jwt, request }) => {
    const { description, type, value } = body

    const token = request.headers.get('Authorization')
    const verify = await jwt.verify(token as string)

    if (!verify) {
      return status(400, 'Bad request')
    }

    if (!verify.sub) {
      return status(400, 'Bad request')
    }

    const typeValue = await new Promise<string>((resolve, reject) => {
      switch (type) {
        case 'e':
          resolve('entrada')
          break
        case 'entrada':
          resolve('entrada')
          break
        case 's':
          resolve('saida')
          break
        case 'saida':
          resolve('saida')
          break
        default:
          reject(new Error('Invalid type'))
      }
    })

    const registerFinance = await finance.createFinance({
      userId: verify.sub,
      description,
      type: typeValue,
      value,
    })

    if (!registerFinance) {
      return status(400, 'Bad Request')
    }

    return status(201, {
      message: registerFinance.message,
      data: {
        id: registerFinance.finance.id,
        userId: registerFinance.finance.userId,
        description: registerFinance.finance.description,
        type: registerFinance.finance.type,
        valor: registerFinance.finance.value,
        createdAt: registerFinance.finance.createdAt,
      },
    })
  },
  {
    body: t.Object({
      description: t.String(),
      type: t.String(),
      value: t.Number(),
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
