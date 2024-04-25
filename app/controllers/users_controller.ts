import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'

export default class UsersController {
  // @inject()
  async list(_: HttpContext) {}
}
