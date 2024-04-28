import { test } from '@japa/runner'

test.group('List Users (E2E)', () => {
  test('should be able list users', async ({ client, assert }) => {
    const authResponse = await client.post('/api/auth').json({
      email: 'marcosadm@email.com',
      password: '123456789',
    })

    const { access_token: accessToken } = authResponse.body()

    const response = await client.get('/api/users?page=1').headers({
      Authorization: `Bearer ${accessToken}`,
    })

    const { users } = response.body()

    response.assertStatus(200)
    assert.isTrue(users.length > 0)
  })
})
