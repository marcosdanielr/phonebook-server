import { UsersRepository } from '../../repositories/users_repository.js'
import { User } from '@prisma/client'

interface ListUsersRequestCaseRequest {
  page: number
}

interface ListUsersResponseCaseResponse {
  users: User[]
}

export class ListUsersUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ page }: ListUsersRequestCaseRequest): Promise<ListUsersResponseCaseResponse> {
    const users = await this.usersRepository.list(page)

    return {
      users,
    }
  }
}
