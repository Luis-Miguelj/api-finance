import { prisma } from '@/infra/prisma'
import { categoriesSchema, type categoriesTypes } from '@/types/categories'

export class Categories {
  async createCategory(data: categoriesTypes) {
    const { userId, name } = categoriesSchema.parse(data)

    const existingCategory = await prisma.category.findFirst({
      where: {
        userId,
        name,
      },
    })

    if (existingCategory) {
      return false
    }

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

  async deleteCategory(categoryId: string, userId: string) {
    if (!categoryId || !userId) {
      return false
    }

    const category = await prisma.category.deleteMany({
      where: {
        id: categoryId,
        userId,
      },
    })

    if (!category) {
      return false
    }

    return true
  }
  async updateCategory(categoryId: string, userId: string, name: string) {
    if (!categoryId || !userId || !name) {
      return false
    }

    const category = await prisma.category.updateMany({
      where: {
        id: categoryId,
        userId,
      },
      data: {
        name,
      },
    })

    if (!category) {
      return false
    }

    return true
  }
}
