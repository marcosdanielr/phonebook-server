import { prisma } from '#lib/prisma'
import { UserPhoneNumbersRepository } from '#repositories/user_phone_numbers_repository'

export class PrismaUserPhoneNumbersRepository implements UserPhoneNumbersRepository {
  async create(userId: number, phoneNumber: string) {
    await prisma.userPhoneNumber.create({
      data: {
        number: phoneNumber,
        user_id: userId,
      },
    })
  }
}
