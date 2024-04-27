import type { HttpContext } from '@adonisjs/core/http'
import { makeAuthenticateUserUseCase } from '#use_cases/factories/make_authenticate_user_use_case'
import TokenService from '#services/token_service'
import { inject } from '@adonisjs/core'
import { InvalidCredentialsError } from '#use_cases/errors/invalid_credentials_error'

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
      const { email, password } = request.body()
      const authenticateUserUseCase = makeAuthenticateUserUseCase()

      const { user } = await authenticateUserUseCase.execute({ email, password })

      const { id: sub, name, email: userEmail, role } = user

      const payload = {
        sub,
        name,
        email: userEmail,
        role,
      }

      const accessToken = this.tokenService.generateToken(payload)

      return {
        access_token: accessToken,
      }
    } catch (error) {
      if (error instanceof InvalidCredentialsError) {
        response.unauthorized({
          message: 'invalid credentials.',
        })
      }
    }
  }
}
