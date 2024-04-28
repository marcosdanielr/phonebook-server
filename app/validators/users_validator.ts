import { $Enums } from '@prisma/client'
import vine from '@vinejs/vine'

export const listUsersValidator = vine.compile(
  vine.object({
    page: vine.number().min(1),
  })
)

export const createUserValidator = vine.compile(
  vine.object({
    name: vine.string().maxLength(240),
    email: vine.string().email().maxLength(254),
    password: vine.string().minLength(8),
    role: vine.enum($Enums.Role),
  })
)
