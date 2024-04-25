import { User } from '@prisma/client'
import { UsersRepository } from '../users_repository.js'

export class InMemoryUsersRepository implements UsersRepository {
  private users: User[] = []

  async list(page: number) {
    return this.users.slice((page - 1) * 10, page * 10)
  }
}
