import { test } from '@japa/runner'

test.group('Delete User (E2E)', () => {
  test('should be able delete user', async ({ client }) => {
    const authResponse = await client.post('/api/auth').json({
      email: 'marcosadm@email.com',
      password: '123456789',
    })

    const { access_token: accessToken } = authResponse.body()

    const getUsersResponse = await client.get('/api/users?page=1').headers({
      Authorization: `Bearer ${accessToken}`,
    })

    const [, , user] = getUsersResponse.body().users

    const response = await client.delete(`/api/users/${user.id}`).headers({
      Authorization: `Bearer ${accessToken}`,
    })

    response.assertStatus(200)
  })
})
