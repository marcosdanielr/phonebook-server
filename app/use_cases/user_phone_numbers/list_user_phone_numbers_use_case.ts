import { UserPhoneNumbersRepository } from '#repositories/user_phone_numbers_repository'
import { UsersRepository } from '#repositories/users_repository'
import { UserNotFoundError } from '#use_cases/errors/user_not_found_error'
import { UserPhoneNumber } from '@prisma/client'

interface ListUserPhoneNumbersRequest {
  userId: number
}

interface ListUserPhoneNumbersResponse {
  user_phone_numbers: UserPhoneNumber[]
}

export class ListUserPhoneNumbersUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private userNumberPhonesRepository: UserPhoneNumbersRepository
  ) {}

  async execute({ userId }: ListUserPhoneNumbersRequest): Promise<ListUserPhoneNumbersResponse> {
    const userExists = await this.usersRepository.findById(userId)

    if (!userExists) {
      throw new UserNotFoundError()
    }

    const userPhoneNumbers = await this.userNumberPhonesRepository.listByUserId(userId)

    return {
      user_phone_numbers: userPhoneNumbers,
    }
  }
}
