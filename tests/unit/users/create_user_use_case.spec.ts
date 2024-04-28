import { test } from '@japa/runner'
import { InMemoryUsersRepository } from '#repositories/in_memory/in_memory_users_repository'
import { CreateUserUseCase, UserCreateInput } from '#use_cases/users/create_use_use_case'
import hash from '@adonisjs/core/services/hash'

test('should be able create user', async ({ assert }) => {
  const usersRepository = new InMemoryUsersRepository()
  const sut = new CreateUserUseCase(usersRepository)

  const userData: UserCreateInput = {
    name: 'User',
    email: 'user123@email.com',
    password: '123456789',
    role: 'USER',
  }

  await sut.execute({
    data: userData,
  })

  const user = await usersRepository.findByEmail(userData.email)

  assert.isTrue(await hash.verify(user!.password_hash, userData.password))
  assert.exists(user)
})
