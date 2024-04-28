import { $Enums, Prisma, User as UserPrisma } from '@prisma/client'

export interface User {
  id: number
  name: string
  email: string
  role: $Enums.Role
}

export interface UsersRepository {
  list(page: number): Promise<User[]>
  create(data: Prisma.UserCreateInput): Promise<void>
  findByEmail(email: string): Promise<UserPrisma | null>
  findById(id: number): Promise<User | null>
  delete(id: number): Promise<void>
  update(id: number, data: Prisma.UserUpdateInput): Promise<void>
}
