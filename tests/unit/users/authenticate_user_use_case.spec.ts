import { InMemoryUsersRepository } from '#repositories/in_memory/in_memory_users_repository'
import { InvalidCredentialsError } from '#use_cases/errors/invalid_credentials_error'
import { AuthenticateUserUseCase } from '#use_cases/users/authenticate_user_use_case'
import hash from '@adonisjs/core/services/hash'
import { test } from '@japa/runner'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUserUseCase

test.group('Authenticate User Use Case', (group) => {
  group.each.setup(async () => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUserUseCase(usersRepository)

    await usersRepository.create({
      name: 'Marcos',
      email: 'marcos@test.com',
      password_hash: await hash.make('123456789'),
      role: 'ADMIN',
    })

    return () => {
      usersRepository = undefined!
      sut = undefined!
    }
  })

  test('should be able authenticate', async ({ assert }) => {
    const { user } = await sut.execute({ email: 'marcos@test.com', password: '123456789' })

    assert.include(user, {
      id: 1,
      name: 'Marcos',
      email: 'marcos@test.com',
    })
  })

  test("shouldn't be able authenticate with invalid email", async ({ assert }) => {
    try {
      await sut.execute({ email: 'wrong@test.com', password: '123456789' })
    } catch (error) {
      assert.instanceOf(error, InvalidCredentialsError)
    }
  })

  test("shouldn't be able authenticate with invalid password", async ({ assert }) => {
    try {
      await sut.execute({ email: 'marcos@test.com', password: '987654321' })
    } catch (error) {
      assert.instanceOf(error, InvalidCredentialsError)
    }
  })
})
