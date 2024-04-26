import { UserPhoneNumbersRepository } from '#repositories/user_phone_numbers_repository'
import { UserPhoneNumber } from '@prisma/client'

export class InMemoryUserPhoneNumbersRepository implements UserPhoneNumbersRepository {
  private userPhoneNumbers: UserPhoneNumber[] = []

  async create(userId: number, phoneNumber: string) {
    const userPhoneNumber = {
      id:
        this.userPhoneNumbers.length > 0
          ? this.userPhoneNumbers[this.userPhoneNumbers.length - 1].id + 1
          : 1,
      number: phoneNumber,
      user_id: userId,
    }

    this.userPhoneNumbers.push(userPhoneNumber)
  }
}
