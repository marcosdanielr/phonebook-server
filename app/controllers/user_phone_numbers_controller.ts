import { PhoneNumberAlreadyExistsError } from '#use_cases/errors/phone_number_already_exists_error'
import { PhoneNumberNotFoundError } from '#use_cases/errors/phone_number_not_found_error'
import { UserNotFoundError } from '#use_cases/errors/user_not_found_error'
import { makeCreateUserPhoneNumberUseCase } from '#use_cases/factories/make_create_user_phone_number_use_case'
import { makeDeleteUserPhoneNumberUseCase } from '#use_cases/factories/make_delete_user_phone_number_use_case'
import { makeDeleteUserUseCase } from '#use_cases/factories/make_delete_user_use_case'
import { makeListUserPhoneNumbersUseCase } from '#use_cases/factories/make_list_user_phone_numbers_use_case'
import { makeUpdateUserPhoneNumberUseCase } from '#use_cases/factories/make_update_user_phone_number_use_case'
import { ListUserPhoneNumbersResponse } from '#use_cases/user_phone_numbers/list_user_phone_numbers_use_case'
import { idValidator } from '#validators/id_validator'
import {
  createUserPhoneNumberValidator,
  updatePhoneNomberValidator,
} from '#validators/user_phone_numbers_validator'
import type { HttpContext } from '@adonisjs/core/http'
import { errors } from '@vinejs/vine'

export default class UserPhoneNumbersController {
  async create({ request, response }: HttpContext): Promise<void> {
    const payload = await createUserPhoneNumberValidator.validate(request.body())

    const { user_id: userId, number } = payload

    try {
      const createUserPhoneNumberUseCase = makeCreateUserPhoneNumberUseCase()

      await createUserPhoneNumberUseCase.execute({
        userId,
        phoneNumber: number,
      })

      return response.created()
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return response.notFound({
          message: error.message,
        })
      }

      if (error instanceof PhoneNumberAlreadyExistsError) {
        return response.conflict({
          message: error.message,
        })
      }

      if (error instanceof errors.E_VALIDATION_ERROR) {
        return response.badRequest(error)
      }

      return response.internalServerError()
    }
  }

  async list({ request, response }: HttpContext): Promise<ListUserPhoneNumbersResponse | unknown> {
    try {
      const params = {
        id: request.params().user_id,
      }

      const payload = await idValidator.validate(params)

      const userId = payload.id

      const listUserPhoneNumbersUseCase = makeListUserPhoneNumbersUseCase()

      const userPhoneNumbers = await listUserPhoneNumbersUseCase.execute({
        userId,
      })

      return userPhoneNumbers
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return response.notFound({
          error: error.message,
        })
      }

      if (error instanceof errors.E_VALIDATION_ERROR) {
        return response.badRequest(error)
      }

      return response.internalServerError()
    }
  }

  async delete({ request, response }: HttpContext): Promise<void> {
    try {
      const payload = await idValidator.validate(request.params())

      const { id } = payload

      const deleteUserPhoneNumberUseCase = makeDeleteUserPhoneNumberUseCase()

      await deleteUserPhoneNumberUseCase.execute({
        id,
      })
    } catch (error) {
      if (error instanceof PhoneNumberNotFoundError) {
        return response.notFound({
          message: error.message,
        })
      }

      if (error instanceof errors.E_VALIDATION_ERROR) {
        return response.badRequest(error)
      }

      return response.internalServerError()
    }
  }

  async update({ request, response }: HttpContext): Promise<void> {
    try {
      const paramsPayload = await idValidator.validate(request.params())
      const bodyPayload = await updatePhoneNomberValidator.validate(request.body())
      const { id } = paramsPayload
      const { number } = bodyPayload

      const updateUserPhoneNumberUseCase = makeUpdateUserPhoneNumberUseCase()

      if (number && id) {
        await updateUserPhoneNumberUseCase.execute({
          id,
          data: {
            number,
          },
        })
      }
    } catch (error) {
      if (error instanceof PhoneNumberNotFoundError) {
        return response.notFound({
          message: error.message,
        })
      }

      if (error instanceof errors.E_VALIDATION_ERROR) {
        return response.badRequest(error)
      }

      return response.internalServerError()
    }
  }
}
