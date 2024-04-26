import { makeListUsersUseCase } from '#use_cases/factories/make_list_users_use_case'
import { ListUsersResponseCaseResponse } from '#use_cases/users/list_users_use_case'

export class UserService {
  async list(page: number): Promise<ListUsersResponseCaseResponse> {
    const listUsersUseCase = makeListUsersUseCase()

    const users = await listUsersUseCase.execute({ page })

    return users
  }
}
