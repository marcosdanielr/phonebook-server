import { User } from '@prisma/client'
import { UsersRepository } from '#repositories/users_repository'

export class InMemoryUsersRepository implements UsersRepository {
  private users: User[] = []

  async list(page: number) {
    return this.users.slice((page - 1) * 10, page * 10)
  }
}
