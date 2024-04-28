import env from '#start/env'
import { $Enums } from '@prisma/client'
import jwt from 'jsonwebtoken'

interface TokenPayload {
  sub: number
  name: string
  role: $Enums.Role
}

export default class TokenService {
  generateToken(payload: TokenPayload): string {
    const ONE_WEEK = 1000 * 60 * 60 * 24 * 7

    return jwt.sign(payload, env.get('JWT_SECRET'), {
      expiresIn: ONE_WEEK,
    })
  }
}
