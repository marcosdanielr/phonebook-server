import { test } from '@japa/runner'

test.group('Authenticate (E2E)', () => {
  test('should be able to authenticate', async ({ client, assert }) => {
    const response = await client.post('/api/auth').json({
      email: 'marcosadm@email.com',
      password: '123456789',
    })

    response.assertStatus(200)
    assert.isTrue(typeof response.body().access_token === 'string')
  })
})
