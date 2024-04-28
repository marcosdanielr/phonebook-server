import { prisma } from '#lib/prisma'
import hash from '@adonisjs/core/services/hash'
import { test } from '@japa/runner'

test.group('Update User (E2E)', () => {
  test('should be able update user', async ({ client, assert }) => {
    const authResponse = await client.post('/api/auth').json({
      email: 'marcosadm@email.com',
      password: '123456789',
    })

    const { access_token: accessToken } = authResponse.body()

    const createUserResponse = await prisma.user.create({
      data: {
        name: 'Test',
        role: 'USER',
        email: '123@user.com',
        password_hash: await hash.make('123456789'),
      },
    })

    const response = await client
      .patch(`/api/users/${createUserResponse.id}`)
      .json({
        role: 'ADMIN',
        password: '2299113344',
      })
      .headers({
        Authorization: `Bearer ${accessToken}`,
      })

    response.assertStatus(200)

    const getUserResponse = await prisma.user.findUnique({
      where: {
        id: createUserResponse.id,
      },
    })

    assert.include(getUserResponse, {
      id: createUserResponse.id,
      name: 'Test',
      role: 'ADMIN',
    })

    assert.notEqual(getUserResponse!.password_hash, createUserResponse.password_hash)
  })
})
