import { $Enums, Prisma, User } from '@prisma/client'
import { UsersRepository } from '#repositories/users_repository'

export class InMemoryUsersRepository implements UsersRepository {
  private users: User[] = []

  async list(page: number) {
    const users = this.users.map(({ password_hash, ...user }) => user)

    return users.slice((page - 1) * 10, page * 10)
  }

  async create(data: Prisma.UserCreateInput) {
    const { name, email, password_hash: passwordHash, role } = data

    let userId = 1
    if (this.users.length > 0) {
      userId = this.users[this.users.length - 1].id + 1
    }

    this.users.push({
      id: userId,
      name,
      email,
      role: role || 'USER',
      password_hash: passwordHash,
      created_at: new Date(),
    })
  }

  async findByEmail(email: string) {
    const user = this.users.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async findById(id: number) {
    const user = this.users.find((item) => item.id === id)

    if (!user) {
      return null
    }

    const { id: userId, name, email, role } = user

    return {
      id: userId,
      name,
      email,
      role,
    }
  }

  async delete(id: number) {
    const index = this.users.findIndex((item) => item.id === id)

    if (index < 0) {
      return
    }

    this.users.splice(index, 1)
  }

  async update(id: number, data: Prisma.UserUpdateInput) {
    const index = this.users.findIndex((item) => item.id === id)

    if (index < 0) {
      return
    }

    const { id: userId, name, email, password_hash: passwordHash, role } = this.users[index]

    const updateData: User = {
      id: userId,
      name: (data.name as string) || name,
      email: (data.email as string) || email,
      password_hash: (data.password_hash as string) || passwordHash,
      role: (data.role as $Enums.Role) || role,
      created_at: this.users[index].created_at,
    }

    this.users[index] = {
      ...this.users[index],
      ...updateData,
    }
  }
}
