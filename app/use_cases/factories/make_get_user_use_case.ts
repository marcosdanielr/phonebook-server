import { PrismaUserRepository } from '#repositories/prisma/prisma_users_repository'
import { GetUserUseCase } from '#use_cases/users/get_user_use_case'

export function makeGetUserUseCase() {
  const usersRepository = new PrismaUserRepository()
  const useCase = new GetUserUseCase(usersRepository)

  return useCase
}
