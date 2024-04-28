import { UsersRepository } from '#repositories/users_repository'
import { UserAlreadyExistsError } from '#use_cases/errors/user_already_exists_error'
import hash from '@adonisjs/core/services/hash'
import { $Enums } from '@prisma/client'

export interface UserCreateInput {
  name: string
  email: string
  password: string
  role: $Enums.Role
}

export interface CreateUserRequestCaseRequest {
  data: UserCreateInput
}

export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) { }

  async execute({ data }: CreateUserRequestCaseRequest): Promise<void> {
    const userExists = await this.usersRepository.findByEmail(data.email)

    if (userExists) {
      throw new UserAlreadyExistsError()
    }

    const { email, name, password, role } = data

    await this.usersRepository.create({
      name,
      email,
      role,
      password_hash: await hash.make(password),
    })
  }
}
