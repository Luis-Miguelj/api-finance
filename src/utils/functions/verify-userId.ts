import { prisma } from '@/infra/prisma'

export async function verifyUserId(userId: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })

  if (!user) {
    return false
  }

  return true
}
