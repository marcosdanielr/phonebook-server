import { PrismaUserRepository } from '#repositories/prisma/prisma_users_repository'
import { ListUsersUseCase } from '#use_cases/users/list_users_use_case'

export function makeListUsersUseCase() {
  const usersRepository = new PrismaUserRepository()
  const useCase = new ListUsersUseCase(usersRepository)

  return useCase
}
