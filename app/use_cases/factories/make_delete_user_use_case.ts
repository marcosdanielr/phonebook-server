import { PrismaUserRepository } from '#repositories/prisma/prisma_users_repository'
import { DeleteUserUseCase } from '#use_cases/users/delete_user_use_case'

export function makeDeleteUserUseCase() {
  const usersRepository = new PrismaUserRepository()
  const useCase = new DeleteUserUseCase(usersRepository)

  return useCase
}
