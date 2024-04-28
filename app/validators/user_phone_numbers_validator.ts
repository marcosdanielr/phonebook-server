import vine from '@vinejs/vine'

export const createUserPhoneNumberValidator = vine.compile(
  vine.object({
    user_id: vine.number().min(1),
    number: vine.string().fixedLength(11),
  })
)

export const updatePhoneNomberValidator = vine.compile(
  vine.object({
    number: vine.string().fixedLength(11).optional(),
  })
)
