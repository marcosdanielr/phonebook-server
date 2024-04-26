import { test } from '@japa/runner'
import { InMemoryUsersRepository } from '#repositories/in_memory/in_memory_users_repository'
import { CreateUserUseCase } from '#use_cases/users/create_use_use_case'
import { Prisma } from '@prisma/client'
import hash from '@adonisjs/core/services/hash'

test('should be able create user', async ({ assert }) => {
  const usersRepository = new InMemoryUsersRepository()
  const sut = new CreateUserUseCase(usersRepository)

  const userData: Prisma.UserCreateInput = {
    name: 'User',
    email: 'user123@email.com',
    password_hash: '123456789',
  }

  await sut.execute({
    data: userData,
  })

  const user = await usersRepository.findByEmail(userData.email)

  assert.isTrue(await hash.verify(user!.password_hash, userData.password_hash))
  assert.exists(user)
})
