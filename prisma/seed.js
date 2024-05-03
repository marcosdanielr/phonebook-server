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
  for (let i = 0; i < 10; i++) {
    const user = {
      name: generateRandomString(8),
      email: generateRandomEmail(),
      role: 'USER',
      password_hash: '$bcrypt$v=98$r=10$uyJ9uessj6iOa84jw325pQ$oUGob15jVdCZhT8djf70c0u4wCOiyS4',
    }
    users.push(user)
  }

  await prisma.user.deleteMany({})

  await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@email.com',
      role: 'ADMIN',
      password_hash: '$bcrypt$v=98$r=10$J1jSASfygmc3eCgAJvWpcg$oAdIHE2GwNQ85a1eBFl85phLQR384zo',
    },
  })

  await prisma.user.createMany({
    data: users,
  })
}

main()
