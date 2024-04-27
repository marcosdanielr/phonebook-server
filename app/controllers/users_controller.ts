import type { HttpContext } from '@adonisjs/core/http'
import { makeListUsersUseCase } from '#use_cases/factories/make_list_users_use_case'

export default class UsersController {
  async list(httpContext: HttpContext) {
    const { page } = httpContext.request.qs()

    const listUsersUseCase = makeListUsersUseCase()

    const users = await listUsersUseCase.execute({ page })

    return users
  }
}
