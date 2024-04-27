import vine from '@vinejs/vine'

export const authenticateValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string(),
  })
)
