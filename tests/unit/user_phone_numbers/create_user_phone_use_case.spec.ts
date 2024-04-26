import { InMemoryUserPhoneNumbersRepository } from '#repositories/in_memory/in_memory_user_phone_numbers_repository'
import { InMemoryUsersRepository } from '#repositories/in_memory/in_memory_users_repository'
import { PhoneNumberAlreadyExistsError } from '#use_cases/errors/phone_number_already_exists_error'
import { UserNotFoundError } from '#use_cases/errors/user_not_found_error'
import { CreateUserPhoneNumberUseCase } from '#use_cases/user_phone_numbers/create_user_phone_number_use_case'
import hash from '@adonisjs/core/services/hash'
import { test } from '@japa/runner'
import { User } from '@prisma/client'

let userPhoneNumbersRepository: InMemoryUserPhoneNumbersRepository
let usersRepository: InMemoryUsersRepository
let user: User | null
let sut: CreateUserPhoneNumberUseCase | undefined

test.group('Create User Phone Number Use Case', (group) => {
  group.each.setup(async () => {
    userPhoneNumbersRepository = new InMemoryUserPhoneNumbersRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new CreateUserPhoneNumberUseCase(userPhoneNumbersRepository, usersRepository)

    await usersRepository.create({
      name: 'Marcos',
      email: 'marcos@test.com',
      password_hash: await hash.make('123456789'),
    })

    user = await usersRepository.findByEmail('marcos@test.com')

    return () => {
      usersRepository = undefined!
      usersRepository = undefined!
      sut = undefined!
      user = undefined!
    }
  })

  test('should be possible create phone number', async ({ assert }) => {
    const phoneNumber = '11111111111'

    await sut!.execute({ phoneNumber, userId: user!.id })

    const userPhoneNumber = await userPhoneNumbersRepository.findByNumber(phoneNumber)

    assert.equal(phoneNumber, userPhoneNumber!.number)
    assert.equal(userPhoneNumber!.id, 1)
  })

  test("shouldn't be possible create phone number if exists", async ({ assert }) => {
    const phoneNumber = '11111111111'

    await sut!.execute({ phoneNumber, userId: user!.id })

    try {
      await sut!.execute({ phoneNumber, userId: user!.id })
    } catch (error) {
      assert.instanceOf(error, PhoneNumberAlreadyExistsError)
    }
  })

  test("shouldn't be possible create phone number if user not exists", async ({ assert }) => {
    try {
      await sut!.execute({ phoneNumber: '12345678910', userId: 18 })
    } catch (error) {
      assert.instanceOf(error, UserNotFoundError)
    }
  })
})
