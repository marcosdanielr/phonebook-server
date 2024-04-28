import { PrismaUserPhoneNumbersRepository } from '#repositories/prisma/prisma_user_phone_numbers_repository'
import { PrismaUserRepository } from '#repositories/prisma/prisma_users_repository'
import { CreateUserPhoneNumberUseCase } from '#use_cases/user_phone_numbers/create_user_phone_number_use_case'

export function makeCreateUserPhoneNumberUseCase() {
  const usersRepository = new PrismaUserRepository()
  const userPhoneNumbersRepository = new PrismaUserPhoneNumbersRepository()
  const useCase = new CreateUserPhoneNumberUseCase(userPhoneNumbersRepository, usersRepository)

  return useCase
}
