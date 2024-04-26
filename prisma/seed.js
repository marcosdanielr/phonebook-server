import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

function generateRandomEmail() {
  const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com']
  const randomDomain = domains[Math.floor(Math.random() * domains.length)]
  return `${generateRandomString(8)}@${randomDomain}`
}

async function main() {
  const users = []
  for (let i = 0; i < 15; i++) {
    const user = {
      name: generateRandomString(8),
      email: generateRandomEmail(),
      password_hash:
        '$scrypt$n=16384,r=8,p=1$uyNr6aucmaQmF0ijc8Iq4Q$oFwk9W8cdkfRLmPFljP/xtubuU2QfSXeDfKn+UkixRWnd39xM91BUJ++zg0fLXlkNqksNpuRXSwK6J2gBwHtjQ',
    }
    users.push(user)
  }

  await prisma.user.deleteMany({})

  await prisma.user.create({
    data: {
      name: 'Marcos',
      email: 'marcosadm@email.com',
      role: 'ADMIN',
      password_hash:
        '$scrypt$n=16384,r=8,p=1$uyNr6aucmaQmF0ijc8Iq4Q$oFwk9W8cdkfRLmPFljP/xtubuU2QfSXeDfKn+UkixRWnd39xM91BUJ++zg0fLXlkNqksNpuRXSwK6J2gBwHtjQ',
    },
  })

  await prisma.user.createMany({
    data: users,
  })
}

main()
