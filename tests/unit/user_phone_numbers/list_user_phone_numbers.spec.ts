import { InMemoryUserPhoneNumbersRepository } from '#repositories/in_memory/in_memory_user_phone_numbers_repository'
import { InMemoryUsersRepository } from '#repositories/in_memory/in_memory_users_repository'
import { UserNotFoundError } from '#use_cases/errors/user_not_found_error'
import { ListUserPhoneNumbersUseCase } from '#use_cases/user_phone_numbers/list_user_phone_numbers_use_case'
import hash from '@adonisjs/core/services/hash'
import { test } from '@japa/runner'

let userPhoneNumbersRepository: InMemoryUserPhoneNumbersRepository
let usersRepository: InMemoryUsersRepository
let sut: ListUserPhoneNumbersUseCase

test.group('List User Phone Numbers Use Case', (group) => {
  group.each.setup(async () => {
    userPhoneNumbersRepository = new InMemoryUserPhoneNumbersRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new ListUserPhoneNumbersUseCase(usersRepository, userPhoneNumbersRepository)

    return () => {
      usersRepository = undefined!
      userPhoneNumbersRepository = undefined!
      sut = undefined!
    }
  })

  test('should be able list user phone numbers by user id', async ({ assert }) => {
    await usersRepository.create({
      name: 'Marcos',
      email: 'marcos@test.com',
      password_hash: await hash.make('123456789'),
    })

    await usersRepository.create({
      name: 'Ludi',
      email: 'ludi@woofwoof.com',
      password_hash: await hash.make('123456789'),
    })

    const firstUser = await usersRepository.findByEmail('marcos@test.com')
    const secondUser = await usersRepository.findByEmail('ludi@woofwoof.com')

    await userPhoneNumbersRepository.create(firstUser!.id, '12345678910')
    await userPhoneNumbersRepository.create(firstUser!.id, '22745678910')

    await userPhoneNumbersRepository.create(secondUser!.id, '82745678910')

    const { user_phone_numbers: firstUserPhones } = await sut.execute({
      userId: firstUser!.id,
    })

    const { user_phone_numbers: secondUserPhones } = await sut.execute({
      userId: secondUser!.id,
    })

    assert.equal(firstUserPhones.length, 2)
    assert.equal(secondUserPhones.length, 1)
  })

  test("shouldn't be able list phones if user not exists", async ({ assert }) => {
    try {
      await sut.execute({ userId: 27 })
    } catch (error) {
      assert.instanceOf(error, UserNotFoundError)
    }
  })
})
