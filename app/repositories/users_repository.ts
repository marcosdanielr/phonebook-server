import { User } from '@prisma/client'

export interface UsersRepository {
  list(page: number): Promise<User[]>
}
