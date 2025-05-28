import { userSchema, type UserType } from '@/types/users'
import { verifyUser } from '@/app/services/auth/verify-user'
import { encryptPassword } from '@/utils/functions/cryptography'
import { prisma } from '@/infra/prisma'
import { comparePassword } from '@/utils/functions/compare-cryptography'

interface loginProps {
  email: string
  password: string
}

interface updateUserProps {
  name?: string
  email?: string
  password?: string
}

export class User {
  async create(data: UserType) {
    const { name, email, password } = userSchema.parse(data)
    const emailVerify = await verifyUser(email)

    if (emailVerify?.response) {
      return {
        message: emailVerify.message,
      }
    }

    const passwordCrypt = await encryptPassword(password)

    if (!passwordCrypt) {
      return {
        message: 'Erro ao criptografar a senha',
      }
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: passwordCrypt,
      },
    })

    if (!user) {
      return {
        message: 'Erro ao criar usuário',
      }
    }

    return {
      message: 'Usuário criado com sucesso',
      usuario: user,
    }
  }

  async getAllUsers() {
    const users = await prisma.user.findMany()

    if (!users) {
      return {
        message: 'Nenhum usuário encontrado.',
      }
    }

    return {
      usuarios: users,
    }
  }

  async getUserById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (!user) {
      return {
        message: 'Usuário não encontrado.',
      }
    }

    return {
      usuario: user,
    }
  }

  async login(data: loginProps) {
    const { email, password } = data

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return {
        message: 'Usuário não encontrado.',
      }
    }

    const passwordVerify = await comparePassword(user.password, password)

    if (!passwordVerify) {
      return {
        message: 'Senha incorreta.',
      }
    }

    return {
      message: 'Login realizado com sucesso.',
      user,
    }
  }

  async updateUser(id: string, data: updateUserProps) {
    const { name, email, password } = userSchema.parse(data)
    const emailVerify = await verifyUser(email)

    if (!id) {
      return false
    }

    if (emailVerify?.response) {
      return false
    }

    const passwordCrypt = await encryptPassword(password)

    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        password: passwordCrypt,
      },
    })

    if (!user) {
      return false
    }

    return {
      message: 'Usuário atualizado com sucesso.',
    }
  }

  async deleteUser(id: string) {
    const user = await prisma.user.delete({
      where: {
        id,
      },
    })

    if (!user) {
      return {
        message: 'Usuário não encontrado.',
      }
    }

    return {
      message: 'Usuário deletado com sucesso.',
    }
  }
}
