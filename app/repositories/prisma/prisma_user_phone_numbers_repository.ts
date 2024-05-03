import { prisma } from '#lib/prisma'
import { UserPhoneNumbersRepository } from '#repositories/user_phone_numbers_repository'
import { Prisma } from '@prisma/client'

export class PrismaUserPhoneNumbersRepository implements UserPhoneNumbersRepository {
  async create(userId: number, phoneNumber: string) {
    return await prisma.userPhoneNumber.create({
      data: {
        number: phoneNumber,
        user_id: userId,
      },
    })
  }

  async findByNumber(phoneNumber: string) {
    const userPhoneNumber = await prisma.userPhoneNumber.findUnique({
      where: {
        number: phoneNumber,
      },
    })

    return userPhoneNumber
  }

  async findById(id: number) {
    const userPhoneNumber = await prisma.userPhoneNumber.findUnique({
      where: {
        id,
      },
    })

    return userPhoneNumber
  }

  async listByUserId(userId: number) {
    const userPhoneNumbers = await prisma.userPhoneNumber.findMany({
      where: {
        user_id: userId,
      },
    })

    return userPhoneNumbers
  }

  async delete(id: number) {
    await prisma.userPhoneNumber.delete({
      where: {
        id,
      },
    })
  }

  async update(id: number, data: Prisma.UserPhoneNumberUpdateInput) {
    await prisma.userPhoneNumber.update({
      where: {
        id,
      },
      data,
    })
  }
}
