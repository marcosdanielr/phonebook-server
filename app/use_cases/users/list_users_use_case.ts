import { UsersRepository } from '#repositories/users_repository'
import { User } from '@prisma/client'

export interface ListUsersRequestCaseRequest {
  page: number
}

export interface ListUsersResponseCaseResponse {
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
