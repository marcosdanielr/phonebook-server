import { test } from '@japa/runner'
import { InMemoryUsersRepository } from '#repositories/in_memory/in_memory_users_repository'
import { ListUsersUseCase } from '#use_cases/users/list_users_use_case'

test('get all users', async ({ assert }) => {
  const usersRepository = new InMemoryUsersRepository()
  const sut = new ListUsersUseCase(usersRepository)

  const { users } = await sut.execute({
    page: 1,
  })

  assert.isArray(users)
  assert.lengthOf(users, 0)
})
