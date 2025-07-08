import { prisma } from '@/infra/prisma'
import { calcFinance } from '../services/finance/calc-finance'

export class Dashboard {
  async getDashboard(id: string) {
    const anoFiltrado = new Date().getFullYear()
    const mesAtual = new Date().getMonth() + 1 // Janeiro = 1
    const valuesPerMonth = []

    const finance = await prisma.finance.findMany({
      where: { userId: id },
    })

    if (!finance) return false

    for (let mes = 1; mes <= mesAtual; mes++) {
      const financeMes = finance.filter(item => {
        const data = new Date(item.createdAt)
        return (
          data.getFullYear() === anoFiltrado &&
          data.getMonth() + 1 === mes
        )
      })

      const total = calcFinance(financeMes) || { entrada: 0, saida: 0 }

      const nomeMes = new Date(anoFiltrado, mes - 1).toLocaleString('default', {
        month: 'long',
      })

      valuesPerMonth.push({
        month: nomeMes,
        entrada: total.entrada,
        saida: total.saida,
      })
    }

    return valuesPerMonth
  }
}