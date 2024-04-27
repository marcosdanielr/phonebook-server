import { PrismaTestDBEnvironment } from '#tests/prisma_test_db_environment'
import { test } from '@japa/runner'

const prismaTestDBEnvironment = new PrismaTestDBEnvironment()

test.group('Authenticate (E2E)', (group) => {
  group.each.setup(async () => {
    await prismaTestDBEnvironment.create()

    return async () => {
      await prismaTestDBEnvironment.teardown()
    }
  })

  test('should be able to authenticate', async ({ client, assert }) => {
    const response = await client.post('/api/auth').json({
      email: 'marcosadm@email.com',
      password: '123456789',
    })

    response.assertStatus(200)
    assert.isTrue(typeof response.body().access_token === 'string')
  })
})
