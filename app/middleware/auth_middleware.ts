import env from '#start/env'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import jwt from 'jsonwebtoken'

export default class AuthMiddleware {
  async handle({ request, response }: HttpContext, next: NextFn) {
    const token = request.headers().authorization

    if (!token) {
      return response.unauthorized()
    }

    const tokenArray = token.split(' ')
    const tokenJWT = tokenArray[1]

    try {
      const payload = jwt.verify(tokenJWT, env.get('JWT_SECRET'))

      if (typeof payload !== 'string' && payload.role === 'ADMIN') {
        const output = await next()
        return output
      }

      return response.unauthorized()
    } catch (error) {
      return response.unauthorized()
    }
  }
}
