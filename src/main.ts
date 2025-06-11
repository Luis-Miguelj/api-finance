import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import { swagger } from '@elysiajs/swagger'

//import endpoints
import { login } from '@/domains/endpoints/auth/login'
import { register } from '@/domains/endpoints/auth/register'
import { getUser } from '@/domains/endpoints/users/get-user'
import { getUserId } from '@/domains/endpoints/users/get-user-id'
import { createFinance } from '@/domains/endpoints/finance/create-finance'
import { getFinanceEntradas } from '@/domains/endpoints/finance/get-finance'
import { getLucro } from '@/domains/endpoints/finance/get-lucro'
// import { updateFinance } from '@/domains/endpoints/finance/update-finance'
import { deleteFinance } from '@/domains/endpoints/finance/delete-finance'
import { updateUser } from '@/domains/endpoints/users/update-user'
import { getItemsFinance } from '@/domains/endpoints/finance/get-items-finance'
import { getCategories } from '@/domains/endpoints/categories/getCategories'
import { createCategories } from '@/domains/endpoints/categories/createCategories'
//import middleware
import { middleware } from '@/infra/middleware'

const port = 3333
const app = new Elysia()
  //Routes GET endpoints
  .use(getUser)
  .use(getUserId)
  .use(getItemsFinance)
  .use(getFinanceEntradas)
  .use(getLucro)
  .use(getCategories)
  //Routes POST endpoints
  .use(login)
  .use(register)
  .use(createFinance)
  .use(createCategories)
  //Routes PUT endpoints
  .use(updateUser)
  // .use(updateFinance)
  //Routes DELETE endpoints
  .use(deleteFinance)

  // Middleware for logging requests
  .use(middleware)

app.use(
  swagger({
    path: '/docs',
    documentation: {
      info: {
        title: 'API de Finanças',
        description: 'API para gerenciamento de ganhos e despesas pessoais.',
        version: '1.0.0',
      },
    },
    autoDarkMode: false,
    provider: 'swagger-ui',
  })
)
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
