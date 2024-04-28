import { PrismaUserPhoneNumbersRepository } from '#repositories/prisma/prisma_user_phone_numbers_repository'
import { UpdateUserPhoneUseCase } from '#use_cases/user_phone_numbers/update_user_phone_number_use_case'

export function makeUpdateUserPhoneNumberUseCase() {
  const userPhoneNumbersRepository = new PrismaUserPhoneNumbersRepository()
  const useCase = new UpdateUserPhoneUseCase(userPhoneNumbersRepository)

  return useCase
}
