import { test } from '@japa/runner'

test.group('Create User (E2E)', () => {
  test('should be able create user', async ({ client }) => {
    const authResponse = await client.post('/api/auth').json({
      email: 'marcosadm@email.com',
      password: '123456789',
    })

    const { access_token: accessToken } = authResponse.body()

    const response = await client
      .post('/api/users')
      .json({
        name: 'Testing',
        role: 'USER',
        email: `testing${Math.floor(Math.random() * 9999) + 1}@email.com`,
        password: '123456789',
      })
      .headers({
        Authorization: `Bearer ${accessToken}`,
      })

    response.assertStatus(201)
  })
})
