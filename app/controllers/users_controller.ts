import type { HttpContext } from '@adonisjs/core/http'
import { makeListUsersUseCase } from '#use_cases/factories/make_list_users_use_case'
import { ListUsersResponseCaseResponse } from '#use_cases/users/list_users_use_case'
import { listUsersValidator } from '#validators/users_validator'

export default class UsersController {
  async list({ request }: HttpContext): Promise<ListUsersResponseCaseResponse> {
    const payload = await listUsersValidator.validate(request.qs())

    const { page } = payload

    const listUsersUseCase = makeListUsersUseCase()

    const users = await listUsersUseCase.execute({ page })

    return users
  }
}
