import { PrismaUserRepository } from '#repositories/prisma/prisma_users_repository'
import { AuthenticateUserUseCase } from '#use_cases/users/authenticate_user_use_case'

export function makeAuthenticateUserUseCase() {
  const usersRepository = new PrismaUserRepository()
  const useCase = new AuthenticateUserUseCase(usersRepository)

  return useCase
}
