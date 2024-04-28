import { test } from '@japa/runner'

test.group('Get Authenticated User (E2E)', () => {
  test('should be able to authenticate', async ({ client, assert }) => {
    const authenticationResponse = await client.post('/api/auth').json({
      email: 'marcosadm@email.com',
      password: '123456789',
    })

    const { access_token: accessToken } = authenticationResponse.body()

    const getAuthenticatedUserResponse = await client.get('/api/auth/current_user').headers({
      Authorization: `Bearer ${accessToken}`,
    })

    getAuthenticatedUserResponse.assertStatus(200)
    assert.include(getAuthenticatedUserResponse.body().user, {
      email: 'marcosadm@email.com',
    })
  })
})
