import { prisma } from '@/infra/prisma'
import { calcFinance } from '../services/finance/calc-finance'
// import { type DashboardTypes, dashboardSchema } from '@/types/type-dashboard'
export class Dashboard {
  async getDashboard(id: string) {
    const anoFiltrado = new Date().getFullYear()
    const valuesPerMonth = []

    const finance = await prisma.finance.findMany({
      where: {
        userId: id,
      },
    })

    if (!finance) {
      return false
    }

    const financeMes = finance.filter(item => {
      const data = new Date(item.createdAt)
      return (
        data.getFullYear() === anoFiltrado &&
        data.getMonth() + 1 === new Date().getMonth() + 1
      )
    })

    const total = calcFinance(financeMes)
    if (!total) {
      return false
    }

    const month = new Date().toLocaleString('default', {
      month: 'long',
      // year: 'numeric',
    })
    // console.log(
    //   `Total for month ${month}: Entradas: ${total.entrada} - Saidas: ${total.saida}`
    // )

    valuesPerMonth.push({
      month: month,
      entrada: total.entrada,
      saida: total.saida,
    })

    const months = valuesPerMonth.filter((item, index) => {
      const mesAtual = new Date().getMonth() + 1
      if (index + 1 <= mesAtual) {
        return item
      }
    })

    return months
  }
}
