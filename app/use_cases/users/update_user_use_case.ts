import { UsersRepository } from '#repositories/users_repository'
import { UserNotFoundError } from '#use_cases/errors/user_not_found_error'
import { Prisma } from '@prisma/client'

interface UpdateUserUseCaseRequest {
  id: number
  data: Prisma.UserUpdateInput
}

export class UpdateUserUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute({ id, data }: UpdateUserUseCaseRequest): Promise<void> {
    const userExists = await this.userRepository.findById(id)

    if (!userExists) {
      throw new UserNotFoundError()
    }

    await this.userRepository.update(id, data)
  }
}
