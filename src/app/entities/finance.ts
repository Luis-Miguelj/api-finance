import { type Finance as financeTypes, financeSchema } from '@/types/finance'
import { prisma } from '@/infra/prisma'

import { calcFinance } from '@/app/services/finance/calc-finance'

interface UpdateFinance {
  id: string
  categoryId: string
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
    const { userId, categoryId, type, value } = financeSchema.parse(data)
    const finance = await prisma.finance.create({
      data: {
        userId,
        type,
        value,
        categoryId,
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
        categoryId: finance.categoryId,
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

    const financeMes = finance.filter(item => {
      const date = new Date().getMonth() + 1

      if (item.createdAt.getMonth() + 1 === date) {
        return item
      }
    })

    const calcFinances = calcFinance(financeMes)

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

    const financeMes = finance.filter(item => {
      const date = new Date().getMonth() + 1

      if (item.createdAt.getMonth() + 1 === date) {
        return item
      }
    })
    const calcFinanceAnual = calcFinance(finance)
    const calcFinancesMesAtual = calcFinance(financeMes)
    if (!calcFinancesMesAtual) {
      return false
    }
    if (!calcFinanceAnual) {
      return false
    }

    const lucroAnual =
      (calcFinanceAnual.entrada ?? 0) - (calcFinanceAnual.saida ?? 0)

    const lucroMesAtual =
      (calcFinancesMesAtual.entrada ?? 0) - (calcFinancesMesAtual.saida ?? 0)

    if (lucroAnual < 0 && lucroMesAtual < 0) {
      return {
        mes: {
          message: 'Você está negativo esse mês',
          lucroDoMes: lucroMesAtual,
        },
        ano: {
          message: 'Você está no negativo',
          lucroAnual,
        },
      }
    }

    if (lucroMesAtual < 0 && lucroAnual >= 0) {
      return {
        mes: {
          message: 'Você está negativo esse mês',
          lucroDoMes: lucroMesAtual,
        },
        ano: {
          message: 'Você está no positivo',
          lucroAnual,
        },
      }
    }

    if (lucroAnual < 0 && lucroMesAtual >= 0) {
      return {
        mes: {
          message: 'Você está positivo esse mês',
          lucroDoMes: lucroMesAtual,
        },
        ano: {
          message: 'Você está no negativo',
          lucroAnual,
        },
      }
    }
    return {
      mes: {
        message: 'Você está positivo esse mês',
        lucroDoMes: lucroMesAtual,
      },
      ano: {
        message: 'Você está no positivo',
        lucroAnual,
      },
    }
  }

  async getItemsFinance(id: string) {
    const finance = await prisma.finance.findMany({
      where: {
        userId: id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    const categories = await prisma.category.findMany({
      where: {
        userId: id,
      },
      select: {
        id: true,
        name: true,
      },
    })

    const categoryMap = new Map(
      categories.map(category => [category.id, category])
    )

    if (!finance) {
      return false
    }

    const items: FinanceItem[] = finance.map(item => {
      const category = categoryMap.get(item.categoryId)
      console.log(category)
      if (!category) {
        throw new Error(`Category not found for item ${item.id}`)
      }
      return {
        id: item.id,
        category: category.name,
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
    if (!id) {
      return false
    }
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
  async updateFinance({ id, categoryId, type, value }: UpdateFinance) {
    const finance = await prisma.finance.update({
      where: {
        id,
      },
      data: {
        type,
        value,
        categoryId,
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
