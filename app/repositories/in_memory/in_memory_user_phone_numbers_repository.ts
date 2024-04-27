import { UserPhoneNumbersRepository } from '#repositories/user_phone_numbers_repository'
import { Prisma, UserPhoneNumber } from '@prisma/client'

export class InMemoryUserPhoneNumbersRepository implements UserPhoneNumbersRepository {
  private userPhoneNumbers: UserPhoneNumber[] = []

  async create(userId: number, phoneNumber: string) {
    let userPhoneId = 1
    if (this.userPhoneNumbers.length > 0) {
      userId = this.userPhoneNumbers[this.userPhoneNumbers.length - 1].id + 1
    }

    const userPhoneNumber = {
      id: userPhoneId,
      number: phoneNumber,
      user_id: userId,
    }

    this.userPhoneNumbers.push(userPhoneNumber)
  }

  async findByNumber(phoneNumber: string) {
    const userPhoneNumber = this.userPhoneNumbers.find((item) => item.number === phoneNumber)

    if (!userPhoneNumber) {
      return null
    }

    return userPhoneNumber
  }

  async listByUserId(userId: number) {
    return this.userPhoneNumbers.filter((item) => item.user_id === userId)
  }

  async delete(id: number) {
    const index = this.userPhoneNumbers.findIndex((item) => item.id === id)

    if (index < 0) {
      return
    }

    this.userPhoneNumbers.splice(index, 1)
  }

  async update(id: number, data: Prisma.UserPhoneNumberUpdateInput) {
    const index = this.userPhoneNumbers.findIndex((item) => item.id === id)

    if (index < 0) {
      return
    }

    this.userPhoneNumbers[index] = {
      ...this.userPhoneNumbers[index],
      number: (data.number as string) || this.userPhoneNumbers[index].number,
    }
  }
}
