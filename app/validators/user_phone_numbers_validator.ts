import vine from '@vinejs/vine'

export const createUserPhoneNumberValidator = vine.compile(
  vine.object({
    user_id: vine.number().min(1),
    number: vine.string().fixedLength(11),
  })
)
