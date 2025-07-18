import { prisma } from '@/infra/prisma'
import { calcFinance } from '../services/finance/calc-finance'
import { formatToUpperCase } from '@/utils/functions/formatUpercase'

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
        return data.getFullYear() === anoFiltrado && data.getMonth() + 1 === mes
      })

      const total = calcFinance(financeMes) || { entrada: 0, saida: 0 }

      const nomeMes = new Date(anoFiltrado, mes - 1).toLocaleString('pt-BR', {
        month: 'long',
      })

      const formatedNomeMes = formatToUpperCase(nomeMes)

      valuesPerMonth.push({
        month: formatedNomeMes,
        Entrada: total.entrada,
        Saida: total.saida,
      })
    }

    return valuesPerMonth
  }
}
