import { verifyUserId } from '@/app/services/auth/verify-user'
import { server } from '@/utils/server'

export const middleware = server.onRequest(async ({ request, jwt, status }) => {
  if (request.method === 'OPTIONS') return

  const token = request.headers.get('Authorization') as string
  const verifyJWT = await jwt.verify(token)

  if (
    request.url.includes('/auth/login') ||
    request.url.includes('/auth/register') ||
    request.url.includes('/docs')
  ) {
    return
  }

  if (!verifyJWT) {
    return status(400, 'Bad Request: Invalid token')
  }

  const userId = verifyUserId(verifyJWT.sub as string)

  if (!userId) {
    return status(400, 'Bad Request: User not found')
  }

  return
})
