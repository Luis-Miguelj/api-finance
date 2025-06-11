import { type Finance as financeTypes, financeSchema } from '@/types/finance'
import { prisma } from '@/infra/prisma'

import { calcFinance } from '@/app/services/finance/calc-finance'

interface UpdateFinance {
  id: string
  category: string
  type: string
  value: number
}

interface FinanceItem {
  id: string
  category: string
  type: string
  value: number
  createdAt: Date
}

export class Finance {
  async createFinance(data: financeTypes) {
    const { userId, category, type, value } = financeSchema.parse(data)
    const finance = await prisma.finance.create({
      data: {
        userId,
        type,
        value,
        category,
      },
    })

    if (!finance) {
      return false
    }

    return {
      finance: {
        id: finance.id,
        userId: finance.userId,
        type: finance.type,
        value: finance.value,
        category: finance.category,
        createdAt: finance.createdAt,
      },
      message: 'Dados cadastrados com sucesso.',
    }
  }
  async getFinance(id: string) {
    const finance = await prisma.finance.findMany({
      where: {
        userId: id,
      },
    })

    if (!finance) {
      return false
    }

    const calcFinances = calcFinance(finance)

    if (!calcFinances) {
      return false
    }

    return {
      entradas: calcFinances.entrada,
      saidas: calcFinances.saida,
    }
  }
  async getFinanceCompareLucro(id: string) {
    const finance = await prisma.finance.findMany({
      where: {
        userId: id,
      },
    })

    if (!finance) {
      return false
    }
    const calcFinances = calcFinance(finance)
    if (!calcFinances) {
      return false
    }

    const lucro = (calcFinances.entrada ?? 0) - (calcFinances.saida ?? 0)

    if (lucro < 0) {
      return {
        message: 'Você está no negativo',
        lucro: lucro,
      }
    }
    return {
      message: 'Você está no positivo',
      lucro: lucro,
    }
  }

  async getItemsFinance(id: string) {
    const finance = await prisma.finance.findMany({
      where: {
        userId: id,
      },
    })

    if (!finance) {
      return false
    }

    const items: FinanceItem[] = finance.map(item => {
      return {
        id: item.id,
        category: item.category,
        type: item.type,
        value: item.value,
        createdAt: item.createdAt,
      }
    })

    if (!items) {
      return false
    }

    return {
      items,
    }
  }

  async deleteFinance(id: string) {
    const finance = await prisma.finance.delete({
      where: {
        id,
      },
    })

    if (!finance) {
      return false
    }

    return {
      message: 'Dados deletados com sucesso.',
    }
  }
  async updateFinance({ id, category, type, value }: UpdateFinance) {
    const finance = await prisma.finance.update({
      where: {
        id,
      },
      data: {
        type,
        value,
        category,
        updatedAt: new Date(),
      },
    })

    if (!finance) {
      return false
    }

    return {
      message: 'Dados atualizados com sucesso.',
    }
  }
}
