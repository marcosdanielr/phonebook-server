import { test } from '@japa/runner'

test.group('Update User (E2E)', () => {
  test('should be able update user', async ({ client }) => {
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
      .patch(`/api/users/${user.id}`)
      .json({
        role: 'ADMIN',
        password: '2299113344',
      })
      .headers({
        Authorization: `Bearer ${accessToken}`,
      })

    response.assertStatus(200)
  })
})
