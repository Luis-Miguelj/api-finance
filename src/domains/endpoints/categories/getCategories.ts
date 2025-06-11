import { server } from '@/utils/server'
import { Categories } from '@/app/entities/categories'
import { t } from 'elysia'

const categories = new Categories()

export const getCategories = server.get(
  '/categories',
  async ({ status, request, jwt }) => {
    const token = request.headers.get('Authorization')
    if (!token) {
      return status(400, 'Unauthorized')
    }
    const verify = await jwt.verify(token)
    if (!verify) {
      return status(400, 'Unauthorized')
    }

    const category = await categories.getCategories(verify.sub as string)
    if (!category) {
      return status(400, 'Category not found')
    }
    return status(200, category)
  },
  {
    response: {
      200: t.Array(
        t.Object({
          id: t.String(),
          name: t.String(),
        })
      ),
      400: t.String(),
    },
  }
)
