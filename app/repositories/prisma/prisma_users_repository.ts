import { prisma } from '#lib/prisma'
import { UsersRepository } from '#repositories/users_repository'

export class PrismaUserRepository implements UsersRepository {
  async list(page: number) {
    const users = prisma.user.findMany({
      take: 10,
      skip: page - 1,
    })

    return users
  }
}
