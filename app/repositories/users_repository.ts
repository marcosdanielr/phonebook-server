import { Prisma, User } from '@prisma/client'

export interface UsersRepository {
  list(page: number): Promise<User[]>
  create(data: Prisma.UserCreateInput): Promise<void>
  findByEmail(email: string): Promise<User | null>
  findById(id: number): Promise<User | null>
  delete(id: number): Promise<void>
  update(id: number, data: Prisma.UserUpdateInput): Promise<void>
}
