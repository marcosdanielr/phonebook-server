export interface UserPhoneNumbersRepository {
  create(userId: number, phoneNumber: string): Promise<void>
}
