import { UsersRepository } from '#repositories/users_repository'
import { UserNotFoundError } from '#use_cases/errors/user_not_found_error'
import { $Enums } from '@prisma/client'
import hash from '@adonisjs/core/services/hash'

export interface UserUpdateInput {
  name?: string
  email?: string
  password?: string
  role?: $Enums.Role
}

interface UpdateUserUseCaseRequest {
  id: number
  data: UserUpdateInput
}

export class UpdateUserUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute({ id, data }: UpdateUserUseCaseRequest): Promise<void> {
    const userExists = await this.userRepository.findById(id)

    if (!userExists) {
      throw new UserNotFoundError()
    }

    const { name, email, password, role } = data

    await this.userRepository.update(id, {
      name,
      email,
      password_hash: password ? await hash.make(password) : undefined,
      role,
    })
  }
}
