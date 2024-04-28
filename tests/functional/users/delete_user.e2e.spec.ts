import { prisma } from '#lib/prisma'
import { test } from '@japa/runner'

test.group('Delete User (E2E)', () => {
  test('should be able delete user', async ({ client, assert }) => {
    const authResponse = await client.post('/api/auth').json({
      email: 'marcosadm@email.com',
      password: '123456789',
    })

    const { access_token: accessToken } = authResponse.body()

    const createUserResponse = await prisma.user.create({
      data: {
        name: 'user to delete',
        email: 'usertodelete@email.com',
        password_hash: '321132',
      },
    })

    const response = await client.delete(`/api/users/${createUserResponse.id}`).headers({
      Authorization: `Bearer ${accessToken}`,
    })

    response.assertStatus(200)

    const userResponse = await prisma.user.findUnique({
      where: {
        id: createUserResponse.id,
      },
    })

    assert.isNull(userResponse)
  })
})
