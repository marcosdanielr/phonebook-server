import type { HttpContext } from '@adonisjs/core/http'
import { makeAuthenticateUserUseCase } from '#use_cases/factories/make_authenticate_user_use_case'
import TokenService from '#services/token_service'
import { inject } from '@adonisjs/core'
import { InvalidCredentialsError } from '#use_cases/errors/invalid_credentials_error'
import { authenticateValidator } from '#validators/authentication_validator'
import { errors } from '@vinejs/vine'
import { GetUserResponse } from '#use_cases/users/get_user_use_case'
import jwt, { JwtPayload } from 'jsonwebtoken'
import env from '#start/env'
import { makeGetUserUseCase } from '#use_cases/factories/make_get_user_use_case'

interface AuthenticationResponse {
  access_token: string
}

@inject()
export default class AuthenticationController {
  constructor(protected tokenService: TokenService) {}

  async authenticate({
    request,
    response,
  }: HttpContext): Promise<AuthenticationResponse | unknown> {
    try {
      const payload = await authenticateValidator.validate(request.body())

      const { email, password } = payload
      const authenticateUserUseCase = makeAuthenticateUserUseCase()

      const { user } = await authenticateUserUseCase.execute({ email, password })

      const { id: sub, name, email: userEmail, role } = user

      const userPayload = {
        sub,
        name,
        email: userEmail,
        role,
      }

      const accessToken = this.tokenService.generateToken(userPayload)

      return {
        access_token: accessToken,
      }
    } catch (error) {
      if (error instanceof InvalidCredentialsError) {
        response.unauthorized({
          message: 'invalid credentials.',
        })

        return
      }

      if (error instanceof errors.E_VALIDATION_ERROR) {
        return response.badRequest(error)
      }

      response.internalServerError()
    }
  }

  async getAuthenticatedUser({ request }: HttpContext): Promise<GetUserResponse> {
    const token = request.headers().authorization!
    const tokenArray = token.split(' ')
    const tokenJWT = tokenArray[1]

    const payload = jwt.verify(tokenJWT, env.get('JWT_SECRET'))

    const getUserUseCase = makeGetUserUseCase()

    const user = await getUserUseCase.execute({
      id: (payload as JwtPayload).id,
    })

    return user
  }
}
