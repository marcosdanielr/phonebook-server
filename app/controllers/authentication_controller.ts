import type { HttpContext } from '@adonisjs/core/http'
import { makeAuthenticateUserUseCase } from '#use_cases/factories/make_authenticate_user_use_case'
import TokenService from '#services/token_service'
import { inject } from '@adonisjs/core'
import { InvalidCredentialsError } from '#use_cases/errors/invalid_credentials_error'
import { authenticateValidator } from '#validators/authentication_validator'

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

      response.badRequest(error)
    }
  }
}
