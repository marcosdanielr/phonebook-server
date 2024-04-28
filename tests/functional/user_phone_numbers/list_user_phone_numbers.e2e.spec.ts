import { test } from '@japa/runner'

test.group('List User Phone Numbers (E2E)', () => {
  test('should be able list user phone numbers', async ({ client, assert }) => {
    const authResponse = await client.post('/api/auth').json({
      email: 'marcosadm@email.com',
      password: '123456789',
    })

    const { access_token: accessToken } = authResponse.body()

    const getUsersResponse = await client.get('/api/users?page=1').headers({
      Authorization: `Bearer ${accessToken}`,
    })

    const [, user] = getUsersResponse.body().users

    await client
      .post('/api/users/phone_numbers')
      .headers({
        Authorization: `Bearer ${accessToken}`,
      })
      .json({
        user_id: user.id,
        number: '12345678910',
      })

    const listPhoneNumbersResponse = await client
      .get(`/api/users/${user.id}/phone_numbers`)
      .headers({
        Authorization: `Bearer ${accessToken}`,
      })

    listPhoneNumbersResponse.assertStatus(200)
    assert.equal(listPhoneNumbersResponse.body().user_phone_numbers.length, 1)
  })
})
