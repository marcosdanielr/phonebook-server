import { test } from '@japa/runner'

test.group('Delete User Phone Number (E2E)', () => {
  test('should be able delete user phone number', async ({ client }) => {
    const authResponse = await client.post('/api/auth').json({
      email: 'marcosadm@email.com',
      password: '123456789',
    })

    const { access_token: accessToken } = authResponse.body()

    const getUsersResponse = await client.get('/api/users?page=1').headers({
      Authorization: `Bearer ${accessToken}`,
    })

    const [, , , user] = getUsersResponse.body().users

    await client
      .post('/api/users/phone_numbers')
      .headers({
        Authorization: `Bearer ${accessToken}`,
      })
      .json({
        user_id: user.id,
        number: '12355631210',
      })

    const listPhoneNumbersResponse = await client
      .get(`/api/users/${user.id}/phone_numbers`)
      .headers({
        Authorization: `Bearer ${accessToken}`,
      })

    const [userPhoneNumber] = await listPhoneNumbersResponse.body().user_phone_numbers

    const deletePhoneNumberResponse = await client
      .delete(`/api/users/phone_numbers/${userPhoneNumber.id}`)
      .headers({
        Authorization: `Bearer ${accessToken}`,
      })

    deletePhoneNumberResponse.assertStatus(200)
  })
})
