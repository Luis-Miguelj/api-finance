import { server } from '@/utils/server'
import { t } from 'elysia'
import { Categories } from '@/app/entities/categories'

const categories = new Categories()

export const deleteCategories = server.delete(
  '/categories/:id',
  async ({ params, jwt, request, status }) => {
    const { id } = params
    const token = request.headers.get('Authorization') || ''
    const userId = await jwt.verify(token)

    if (!userId) {
      return status(401, 'Id do usuário não encontrado')
    }

    const deleteResult = await categories.deleteCategory(
      id,
      userId.sub as string
    )

    if (!deleteResult) {
      return status(400, 'Erro ao deletar categoria')
    }

    return status(200, { message: 'Categoria deletada com sucesso' })
  },
  {
    params: t.Object({
      id: t.String(),
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
