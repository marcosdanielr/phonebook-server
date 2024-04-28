import { PrismaUserRepository } from '#repositories/prisma/prisma_users_repository'
import { UpdateUserUseCase } from '#use_cases/users/update_user_use_case'

export function makeUpdateUserUseCase() {
  const usersRepository = new PrismaUserRepository()
  const useCase = new UpdateUserUseCase(usersRepository)

  return useCase
}
