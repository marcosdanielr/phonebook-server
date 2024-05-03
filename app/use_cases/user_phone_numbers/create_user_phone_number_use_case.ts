import { UserPhoneNumbersRepository } from '#repositories/user_phone_numbers_repository'
import { UsersRepository } from '#repositories/users_repository'
import { PhoneNumberAlreadyExistsError } from '#use_cases/errors/phone_number_already_exists_error'
import { UserNotFoundError } from '#use_cases/errors/user_not_found_error'
import { UserPhoneNumber } from '@prisma/client'

interface CreateUserPhoneNumberRequest {
  userId: number
  phoneNumber: string
}

export interface CreateUserPhoneNumberResponse {
  user_phone_number: UserPhoneNumber
}

export class CreateUserPhoneNumberUseCase {
  constructor(
    private userPhoneNumbersRepository: UserPhoneNumbersRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute({
    userId,
    phoneNumber,
  }: CreateUserPhoneNumberRequest): Promise<CreateUserPhoneNumberResponse> {
    const userExists = await this.usersRepository.findById(userId)

    if (!userExists) {
      throw new UserNotFoundError()
    }

    const phoneExists = await this.userPhoneNumbersRepository.findByNumber(phoneNumber)

    if (phoneExists) {
      throw new PhoneNumberAlreadyExistsError()
    }

    const userPhoneNumber = await this.userPhoneNumbersRepository.create(userId, phoneNumber)

    return {
      user_phone_number: userPhoneNumber,
    }
  }
}
