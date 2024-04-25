import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'

export default class UserController {
  @inject()
  async list(_: HttpContext) {}
}
