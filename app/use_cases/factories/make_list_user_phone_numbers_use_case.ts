import { PrismaUserPhoneNumbersRepository } from '#repositories/prisma/prisma_user_phone_numbers_repository'
import { PrismaUserRepository } from '#repositories/prisma/prisma_users_repository'
import { ListUserPhoneNumbersUseCase } from '#use_cases/user_phone_numbers/list_user_phone_numbers_use_case'

export function makeListUserPhoneNumbersUseCase() {
  const usersRepository = new PrismaUserRepository()
  const userPhoneNumbersRepository = new PrismaUserPhoneNumbersRepository()
  const useCase = new ListUserPhoneNumbersUseCase(usersRepository, userPhoneNumbersRepository)

  return useCase
}
