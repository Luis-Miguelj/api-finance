import { server } from '@/utils/server'
import { t } from 'elysia'
import { Categories } from '@/app/entities/categories'

const categories = new Categories()

export const updateCategories = server.put(
  '/categories/:id',
  async ({ body, params, jwt, request, status }) => {
    const { name } = body
    const { id } = params
    const token = request.headers.get('Authorization') || ''
    const userId = await jwt.verify(token)

    if (!userId) {
      return status(401, 'Id do usuário não encontrado')
    }

    const categoriesUpdateData = await categories.updateCategory(
      id,
      userId.sub as string,
      name
    )

    if (!categoriesUpdateData) {
      return status(400, 'Erro ao atualizar categoria')
    }

    return status(200, { message: 'Categoria atualizada com sucesso' })
  },
  {
    params: t.Object({
      id: t.String(),
    }),
    body: t.Object({
      name: t.String(),
    }),
    response: {
      200: t.Object({
        message: t.String(),
      }),
      400: t.String(),
      401: t.String(),
    },
  }
)
