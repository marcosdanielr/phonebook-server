import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { UserService } from '#services/user_service'

export default class UserController {
  @inject()
  async list(httpContext: HttpContext, userService: UserService) {
    const { page } = httpContext.request.qs()

    return userService.list(page || 1)
  }
}
