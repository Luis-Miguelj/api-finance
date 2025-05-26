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

const port = 3333
const app = new Elysia()
  .use(register)
  .use(getUser)
  .use(getUserId)
  .use(login)
  .use(createFinance)
  .use(getFinanceEntradas)
  .use(getLucro)

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
