import { InMemoryUserPhoneNumbersRepository } from '#repositories/in_memory/in_memory_user_phone_numbers_repository'
import { InMemoryUsersRepository } from '#repositories/in_memory/in_memory_users_repository'
import { PhoneNumberNotFoundError } from '#use_cases/errors/phone_number_not_found_error'
import { DeleteUserPhoneUseCase } from '#use_cases/user_phone_numbers/delete_user_phone_number_use_case'
import hash from '@adonisjs/core/services/hash'
import { test } from '@japa/runner'
import { User, UserPhoneNumber } from '@prisma/client'

let userPhoneNumbersRepository: InMemoryUserPhoneNumbersRepository
let usersRepository: InMemoryUsersRepository
let user: User | null
let sut: DeleteUserPhoneUseCase

test.group('Delete User Phone Number Use Case', (group) => {
  group.each.setup(async () => {
    userPhoneNumbersRepository = new InMemoryUserPhoneNumbersRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new DeleteUserPhoneUseCase(userPhoneNumbersRepository)

    await usersRepository.create({
      name: 'Marcos',
      email: 'marcos@test.com',
      password_hash: await hash.make('123456789'),
    })

    user = await usersRepository.findByEmail('marcos@test.com')

    await userPhoneNumbersRepository.create(user!.id, '12345678910')
    await userPhoneNumbersRepository.create(user!.id, '22745678910')

    return () => {
      usersRepository = undefined!
      userPhoneNumbersRepository = undefined!
      sut = undefined!
      user = undefined!
    }
  })

  test('should be able delete phone number', async ({ assert }) => {
    let phoneNumbers: UserPhoneNumber[]

    phoneNumbers = await userPhoneNumbersRepository.listByUserId(user!.id)
    assert.equal(phoneNumbers.length, 2)

    await sut.execute({ id: phoneNumbers[0].id })

    phoneNumbers = await userPhoneNumbersRepository.listByUserId(user!.id)
    assert.equal(phoneNumbers.length, 1)
  })

  test("shouldn't be able delete phone number if not exists", async ({ assert }) => {
    try {
      await sut.execute({ id: 27 })
    } catch (error) {
      assert.instanceOf(error, PhoneNumberNotFoundError)
    }
  })
})
