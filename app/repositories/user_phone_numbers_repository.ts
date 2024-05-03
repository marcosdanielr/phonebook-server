import { Prisma, UserPhoneNumber } from '@prisma/client'

export interface UserPhoneNumbersRepository {
  create(userId: number, phoneNumber: string): Promise<UserPhoneNumber>
  findByNumber(phoneNumber: string): Promise<UserPhoneNumber | null>
  findById(id: number): Promise<UserPhoneNumber | null>
  listByUserId(userId: number): Promise<UserPhoneNumber[]>
  delete(id: number): Promise<void>
  update(id: number, data: Prisma.UserPhoneNumberUpdateInput): Promise<void>
}
