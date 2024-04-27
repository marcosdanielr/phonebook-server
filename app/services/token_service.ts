import env from '#start/env'
import jwt from 'jsonwebtoken'

interface TokenPayload {
  sub: number
  name: string
  role: string
}

export default class TokenService {
  generateToken(payload: TokenPayload): string {
    const ONE_WEEK = 1000 * 60 * 60 * 24 * 7

    return jwt.sign(payload, env.get('JWT_SECRET'), {
      expiresIn: ONE_WEEK,
    })
  }
}
