import { prisma } from '#lib/prisma'
import { UsersRepository } from '#repositories/users_repository'
import { Prisma } from '@prisma/client'

export class PrismaUserRepository implements UsersRepository {
  async list(page: number) {
    const users = prisma.user.findMany({
      take: 10,
      skip: (page - 1) * 10,
      select: {
        id: true,
        role: true,
        name: true,
        email: true,
      },
    })

    return users
  }

  async create(data: Prisma.UserCreateInput) {
    const { name, email, password_hash: passwordHash, role } = data

    await prisma.user.create({
      data: {
        email,
        name,
        role: role || 'USER',
        password_hash: passwordHash,
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

  async findById(id: number) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        role: true,
        email: true,
      },
    })

    return user
  }

  async delete(id: number) {
    await prisma.user.delete({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    })
  }

  async update(id: number, data: Prisma.UserUpdateInput) {
    await prisma.user.update({
      where: {
        id,
      },
      data,
    })
  }
}
