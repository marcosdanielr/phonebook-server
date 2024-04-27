import { InMemoryUserPhoneNumbersRepository } from '#repositories/in_memory/in_memory_user_phone_numbers_repository'
import { InMemoryUsersRepository } from '#repositories/in_memory/in_memory_users_repository'
import { PhoneNumberNotFoundError } from '#use_cases/errors/phone_number_not_found_error'
import { UpdateUserPhoneUseCase } from '#use_cases/user_phone_numbers/update_user_phone_number_use_case'
import hash from '@adonisjs/core/services/hash'
import { test } from '@japa/runner'
import { User, UserPhoneNumber } from '@prisma/client'

let userPhoneNumbersRepository: InMemoryUserPhoneNumbersRepository
let usersRepository: InMemoryUsersRepository
let user: User | null
let sut: UpdateUserPhoneUseCase

test.group('Update User Phone Number Use Case', (group) => {
  group.each.setup(async () => {
    userPhoneNumbersRepository = new InMemoryUserPhoneNumbersRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new UpdateUserPhoneUseCase(userPhoneNumbersRepository)

    await usersRepository.create({
      name: 'Marcos',
      email: 'marcos@test.com',
      password_hash: await hash.make('123456789'),
    })

    user = await usersRepository.findByEmail('marcos@test.com')

    return () => {
      usersRepository = undefined!
      userPhoneNumbersRepository = undefined!
      sut = undefined!
      user = undefined!
    }
  })

  test('should be able update user phone number', async ({ assert }) => {
    let userPhoneNumber: UserPhoneNumber | null

    await userPhoneNumbersRepository.create(user!.id, '12345678910')
    await userPhoneNumbersRepository.create(user!.id, '22745678910')

    userPhoneNumber = await userPhoneNumbersRepository.findByNumber('22745678910')

    await sut.execute({
      id: userPhoneNumber!.id,
      data: {
        number: '40028922',
      },
    })

    userPhoneNumber = await userPhoneNumbersRepository.findById(userPhoneNumber!.id)

    assert.equal(userPhoneNumber!.number, '40028922')
  })

  test("shouldn't be able update phone number if not exists", async ({ assert }) => {
    try {
      await sut.execute({
        id: 20,
        data: {
          number: '123452193',
        },
      })
    } catch (error) {
      assert.instanceOf(error, PhoneNumberNotFoundError)
    }
  })
})
