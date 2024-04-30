import { UsersRepository } from '#repositories/users_repository'
import env from '#start/env'
import { InvalidCredentialsError } from '#use_cases/errors/invalid_credentials_error'
import hash from '@adonisjs/core/services/hash'
import jwt from 'jsonwebtoken'

interface AuthenticateUserRequest {
  email: string
  password: string
}

interface AuthenticateUserResponse {
  access_token: string
}

export class AuthenticateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ email, password }: AuthenticateUserRequest): Promise<AuthenticateUserResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user || user.role !== 'ADMIN') {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await hash.verify(user.password_hash, password)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    const ONE_WEEK = 1000 * 60 * 60 * 24 * 7

    const payload = {
      sub: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    }

    const accessToken = jwt.sign(payload, env.get('JWT_SECRET'), {
      expiresIn: ONE_WEEK,
    })

    return {
      access_token: accessToken,
    }
  }
}
