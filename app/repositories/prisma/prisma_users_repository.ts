import { prisma } from '../../lib/prisma.js'
import { UsersRepository } from '../users_repository.js'

export class PrismaUserRepository implements UsersRepository {
  async list(page: number) {
    const users = prisma.user.findMany({
      take: 10,
      skip: page - 1,
    })

    return users
  }
}
