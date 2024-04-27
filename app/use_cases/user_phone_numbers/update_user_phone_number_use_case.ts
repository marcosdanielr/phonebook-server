import { UserPhoneNumbersRepository } from '#repositories/user_phone_numbers_repository'
import { PhoneNumberNotFoundError } from '#use_cases/errors/phone_number_not_found_error'
import { Prisma } from '@prisma/client'

interface UpdateUserPhoneRequest {
  id: number
  data: Prisma.UserPhoneNumberUpdateInput
}

export class UpdateUserPhoneUseCase {
  constructor(private userPhoneRepository: UserPhoneNumbersRepository) {}

  async execute({ id, data }: UpdateUserPhoneRequest): Promise<void> {
    const phoneExists = await this.userPhoneRepository.findById(id)

    if (!phoneExists) {
      throw new PhoneNumberNotFoundError()
    }

    await this.userPhoneRepository.update(id, data)
  }
}
