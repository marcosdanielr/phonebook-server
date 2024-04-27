import { UserPhoneNumber } from '@prisma/client'

export interface UserPhoneNumbersRepository {
  create(userId: number, phoneNumber: string): Promise<void>
  findByNumber(phoneNumber: string): Promise<UserPhoneNumber | null>
  listByUserId(userId: number): Promise<UserPhoneNumber[]>
  delete(id: number): Promise<void>
}
