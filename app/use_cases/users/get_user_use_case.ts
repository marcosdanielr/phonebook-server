import { User, UsersRepository } from '#repositories/users_repository'
import { UserNotFoundError } from '#use_cases/errors/user_not_found_error'

interface GetUserRequest {
  id: number
}

export interface GetUserResponse {
  user: User
}

export class GetUserUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute({ id }: GetUserRequest): Promise<GetUserResponse> {
    const user = await this.userRepository.findById(id)

    if (!user) {
      throw new UserNotFoundError()
    }

    return {
      user,
    }
  }
}
