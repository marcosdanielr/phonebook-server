import { UserPhoneNumbersRepository } from '#repositories/user_phone_numbers_repository'
import { PhoneNumberNotFoundError } from '#use_cases/errors/phone_number_not_found_error'

interface DeleteUserPhoneNumberRequest {
  id: number
}

export class DeleteUserPhoneUseCase {
  constructor(private userPhoneNumbersRepository: UserPhoneNumbersRepository) {}

  async execute({ id }: DeleteUserPhoneNumberRequest): Promise<void> {
    const phoneExists = await this.userPhoneNumbersRepository.findById(id)

    if (!phoneExists) {
      throw new PhoneNumberNotFoundError()
    }

    await this.userPhoneNumbersRepository.delete(id)
  }
}
