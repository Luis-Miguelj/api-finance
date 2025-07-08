import { server } from '@/utils/server'
import { Finance } from '@/app/entities/finance'
import { t } from 'elysia'

const finance = new Finance()
export const getLucro = server.get(
  '/finance/lucro',
  async ({ status, jwt, request }) => {
    const token = request.headers.get('Authorization')
    const verify = await jwt.verify(token as string)

    console.log('verify', verify)

    if (!verify) {
      return status(400, 'ID is required.')
    }

    if (!verify.sub) {
      return status(400, 'ID is required.')
    }

    const financeData = await finance.getFinanceCompareLucro(verify.sub)
    if (!financeData) {
      return status(404, 'Finance data not found.')
    }

    return status(200, {
      mes: {
        message: financeData.mes.message,
        lucroDoMes: financeData.mes.lucroDoMes,
      },
      ano: {
        message: financeData.ano.message,
        lucroAnual: financeData.ano.lucroAnual,
      },
    })
  },
  {
    response: {
      200: t.Object({
        mes: t.Object({
          message: t.String(),
          lucroDoMes: t.Number(),
        }),
        ano: t.Object({
          message: t.String(),
          lucroAnual: t.Number(),
        }),
      }),
      400: t.String(),
      404: t.String(),
    },
  }
)
