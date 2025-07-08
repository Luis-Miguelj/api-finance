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

export async function verifyUserId(id: string) {
  const userIdVerify = await prisma.user.findUnique({
    where: {
      id,
    },
  })

  if (userIdVerify) {
    return {
      message: 'Esse usuário já está cadastrado',
      response: true,
    }
  }

  return false
}
