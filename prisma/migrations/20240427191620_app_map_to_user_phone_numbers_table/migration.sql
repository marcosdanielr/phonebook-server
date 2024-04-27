/*
  Warnings:

  - You are about to drop the `UserPhoneNumber` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserPhoneNumber" DROP CONSTRAINT "UserPhoneNumber_user_id_fkey";

-- DropTable
DROP TABLE "UserPhoneNumber";

-- CreateTable
CREATE TABLE "user_phone_numbers" (
    "id" SERIAL NOT NULL,
    "number" VARCHAR(11) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "user_phone_numbers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_phone_numbers_id_key" ON "user_phone_numbers"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_phone_numbers_number_key" ON "user_phone_numbers"("number");

-- CreateIndex
CREATE UNIQUE INDEX "user_phone_numbers_user_id_key" ON "user_phone_numbers"("user_id");

-- AddForeignKey
ALTER TABLE "user_phone_numbers" ADD CONSTRAINT "user_phone_numbers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
