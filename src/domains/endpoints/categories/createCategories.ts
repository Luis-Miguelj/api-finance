import { server } from '@/utils/server'
import { Categories } from '@/app/entities/categories'
import { t } from 'elysia'

const categories = new Categories()
export const createCategories = server.post(
  '/categories',
  async ({ body, status, request, jwt }) => {
    const token = request.headers.get('Authorization')
    if (!token) {
      return status(400, 'Unauthorized')
    }
    const verify = await jwt.verify(token)
    if (!verify) {
      return status(400, 'Unauthorized')
    }

    const { name } = body
    if (!name) {
      return status(400, 'Name is required')
    }

    const category = await categories.createCategory({
      userId: verify.sub as string,
      name,
    })

    if (!category) {
      return status(400, 'Error creating category')
    }

    return status(201, category)
  },
  {
    body: t.Object({
      name: t.String(),
    }),
    response: {
      201: t.Object({
        id: t.String(),
        name: t.String(),
      }),
      400: t.String(),
    },
  }
)
