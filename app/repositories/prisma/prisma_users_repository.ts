import { prisma } from '#lib/prisma'
import { UsersRepository } from '#repositories/users_repository'
import hash from '@adonisjs/core/services/hash'
import { Prisma } from '@prisma/client'

export class PrismaUserRepository implements UsersRepository {
  async list(page: number) {
    const users = prisma.user.findMany({
      take: 10,
      skip: page - 1,
    })

    return users
  }

  async create(data: Prisma.UserCreateInput) {
    const { name, email, password_hash: passwordHash } = data

    await prisma.user.create({
      data: {
        email,
        name,
        role: 'USER',
        password_hash: await hash.make(passwordHash),
      },
    })
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }
}