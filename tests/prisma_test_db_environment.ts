import { PrismaClient } from '@prisma/client'
import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import env from '#start/env'

export class PrismaTestDBEnvironment {
  private prisma = new PrismaClient()
  private schema = randomUUID()

  private async generateDatebaseURL(schema: string): Promise<string> {
    if (!env.get('DATABASE_URL')) {
      throw new Error('Please provide a DATABASE_URL environment variable.')
    }

    const url = new URL(env.get('DATABASE_URL'))

    url.searchParams.set('schema', schema)

    return url.toString()
  }

  async create(): Promise<void> {
    const databaseURL = await this.generateDatebaseURL(this.schema)

    env.set('DATABASE_URL', databaseURL)

    execSync('npx prisma migrate deploy')
    execSync('npx prisma db seed')
  }

  async teardown(): Promise<void> {
    await this.prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${this.schema}" CASCADE`)

    await this.prisma.$disconnect()
  }
}
