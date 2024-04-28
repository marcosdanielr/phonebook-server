import { test } from '@japa/runner'

test.group('Create User Phone Number (E2E)', () => {
  test('should be able create phone number', async ({ client }) => {
    const authResponse = await client.post('/api/auth').json({
      email: 'marcosadm@email.com',
      password: '123456789',
    })

    const { access_token: accessToken } = authResponse.body()

    const getUsersResponse = await client.get('/api/users?page=1').headers({
      Authorization: `Bearer ${accessToken}`,
    })

    const [, user] = getUsersResponse.body().users

    const response = await client
      .post('/api/users/phone_numbers')
      .headers({
        Authorization: `Bearer ${accessToken}`,
      })
      .json({
        user_id: user.id,
        number: '12345678910',
      })

    response.assertStatus(201)
  })
})
