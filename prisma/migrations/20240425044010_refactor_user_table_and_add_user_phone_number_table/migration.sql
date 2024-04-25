/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(240) NOT NULL,
    "email" VARCHAR(254) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "password_hash" VARCHAR(240) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPhoneNumber" (
    "id" SERIAL NOT NULL,
    "number" VARCHAR(11) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "UserPhoneNumber_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserPhoneNumber_user_id_key" ON "UserPhoneNumber"("user_id");

-- AddForeignKey
ALTER TABLE "UserPhoneNumber" ADD CONSTRAINT "UserPhoneNumber_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
