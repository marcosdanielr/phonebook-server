import { UsersRepository } from '#repositories/users_repository'
import { UserAlreadyExistsError } from '#use_cases/errors/user_already_exists_error'
import { Prisma } from '@prisma/client'

export interface CreateUserRequestCaseRequest {
  data: Prisma.UserCreateInput
}

export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ data }: CreateUserRequestCaseRequest): Promise<void> {
    const userExists = await this.usersRepository.findByEmail(data.email)

    if (userExists) {
      throw new UserAlreadyExistsError()
    }

    await this.usersRepository.create(data)
  }
}
