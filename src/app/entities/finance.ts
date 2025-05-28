import { type Finance as financeTypes, financeSchema } from '@/types/finance'
import { prisma } from '@/infra/prisma'

import { calcFinance } from '@/app/services/finance/calc-finance'

export class Finance {
  async createFinance(data: financeTypes) {
    const { userId, description, type, value } = financeSchema.parse(data)

    const finance = await prisma.finance.create({
      data: {
        userId,
        description,
        type,
        value,
      },
    })

    if (!finance) {
      return false
    }

    return {
      finance: {
        id: finance.id,
        userId: finance.userId,
        description: finance.description,
        type: finance.type,
        value: finance.value,
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

    const items = finance.map(items => {
      return {
        description: items.description,
        type: items.type,
        value: items.value,
        createdAt: items.createdAt,
      }
    })

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
  async updateFinance(
    id: string,
    description: string,
    type: string,
    value: number
  ) {
    const finance = await prisma.finance.update({
      where: {
        id,
      },
      data: {
        description,
        type,
        value,
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
