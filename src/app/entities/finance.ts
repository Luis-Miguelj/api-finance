import { type Finance as financeTypes, financeSchema } from '@/types/finance'
import { prisma } from '@/infra/prisma'

import { calcEntradas } from '@/app/services/finance/calc-entradas'

export class Finance {
  async createFinance(data: financeTypes) {
    const { userId, entrada, saida } = financeSchema.parse(data)

    const finance = await prisma.finance.create({
      data: {
        userId,
        entrada,
        saida,
      },
    })

    if (!finance) {
      return false
    }

    return {
      finance: {
        id: finance.id,
        userId: finance.userId,
        entrada: finance.entrada,
        saida: finance.saida,
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

    const financeCalcEntradas = calcEntradas(finance)

    if (!financeCalcEntradas) {
      return false
    }

    return {
      entradas: financeCalcEntradas.entrada,
      saidas: financeCalcEntradas.saida,
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
    const financeCalcEntradas = calcEntradas(finance)
    if (!financeCalcEntradas) {
      return false
    }

    const lucro =
      (financeCalcEntradas.entrada ?? 0) - (financeCalcEntradas.saida ?? 0)

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
  async updateFinance(id: string, entrada: number, saida: number) {
    const finance = await prisma.finance.update({
      where: {
        id,
      },
      data: {
        entrada,
        saida,
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
