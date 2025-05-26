import { prisma } from '@/infra/prisma'

export async function verifyUser(email: string) {
  const emailVerify = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (emailVerify) {
    return {
      message: 'Esse email já está cadastrado',
      response: true,
    }
  }
}
