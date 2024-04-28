import { PrismaUserPhoneNumbersRepository } from '#repositories/prisma/prisma_user_phone_numbers_repository'
import { DeleteUserPhoneUseCase } from '#use_cases/user_phone_numbers/delete_user_phone_number_use_case'

export function makeDeleteUserPhoneNumberUseCase() {
  const userPhoneNumbersRepository = new PrismaUserPhoneNumbersRepository()
  const useCase = new DeleteUserPhoneUseCase(userPhoneNumbersRepository)

  return useCase
}
