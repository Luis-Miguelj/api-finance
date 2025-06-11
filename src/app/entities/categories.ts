import { prisma } from '@/infra/prisma'
import { categoriesSchema, type categoriesTypes } from '@/types/categories'

export class Categories {
  async createCategory(data: categoriesTypes) {
    const { userId, name } = categoriesSchema.parse(data)
    const category = await prisma.category.create({
      data: {
        userId,
        name,
      },
    })

    if (!category) {
      return false
    }

    return category
  }

  async getCategories(userId: string) {
    if (!userId) {
      return false
    }
    const categories = await prisma.category.findMany({
      where: {
        userId,
      },
      orderBy: {
        id: 'desc',
      },
    })
    if (!categories) {
      return false
    }

    const returnCategories = categories.map(category => {
      return {
        id: category.id,
        name: category.name,
      }
    })

    return returnCategories
  }
}
