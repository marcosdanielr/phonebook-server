export class PhoneNumberAlreadyExistsError extends Error {
  constructor() {
    super('Phone number already exists.')
  }
}
