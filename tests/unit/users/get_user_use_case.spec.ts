import { test } from '@japa/runner'
import { InMemoryUsersRepository } from '#repositories/in_memory/in_memory_users_repository'
import { GetUserUseCase } from '#use_cases/users/get_user_use_case'

test('should be able get user by id', async ({ assert }) => {
  const usersRepository = new InMemoryUsersRepository()
  const sut = new GetUserUseCase(usersRepository)

  await usersRepository.create({
    name: 'User',
    email: 'user@email.com',
    password_hash: '21212',
    role: 'ADMIN',
  })

  const { user } = await sut.execute({
    id: 1,
  })

  assert.include(user, {
    id: 1,
    name: 'User',
    email: 'user@email.com',
  })
})
