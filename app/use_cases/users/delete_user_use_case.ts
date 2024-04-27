import { UsersRepository } from '#repositories/users_repository'
import { UserNotFoundError } from '#use_cases/errors/user_not_found_error'

interface DeleteUserUseCaseRequest {
  id: number
}

export class DeleteUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ id }: DeleteUserUseCaseRequest): Promise<void> {
    const userExists = await this.usersRepository.findById(id)

    if (!userExists) {
      throw new UserNotFoundError()
    }

    await this.usersRepository.delete(id)
  }
}
