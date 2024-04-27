import { InMemoryUsersRepository } from '#repositories/in_memory/in_memory_users_repository'
import { UserNotFoundError } from '#use_cases/errors/user_not_found_error'
import { DeleteUserUseCase } from '#use_cases/users/delete_user_use_case'
import hash from '@adonisjs/core/services/hash'
import { test } from '@japa/runner'

let usersRepository: InMemoryUsersRepository
let sut: DeleteUserUseCase

test.group('Delete User Use Case', (group) => {
  group.each.setup(async () => {
    usersRepository = new InMemoryUsersRepository()
    sut = new DeleteUserUseCase(usersRepository)

    return () => {
      usersRepository = undefined!
      sut = undefined!
    }
  })

  test('should be able delete user by id', async ({ assert }) => {
    for (let i = 1; i <= 3; i++) {
      await usersRepository.create({
        name: `user-${i}`,
        email: `user${i}@test.com`,
        password_hash: await hash.make('123456789'),
      })
    }

    await sut.execute({ id: 2 })

    const users = await usersRepository.list(1)

    assert.equal(users.length, 2)
  })

  test("shouldn't be able delete user if not exists", async ({ assert }) => {
    try {
      await sut.execute({ id: 20 })
    } catch (error) {
      assert.instanceOf(error, UserNotFoundError)
    }
  })
})
