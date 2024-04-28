import { PrismaUserRepository } from '#repositories/prisma/prisma_users_repository'
import { CreateUserUseCase } from '#use_cases/users/create_use_use_case'

export function makeCreateUserUseCase() {
  const usersRepository = new PrismaUserRepository()
  const useCase = new CreateUserUseCase(usersRepository)

  return useCase
}
