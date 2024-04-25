/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `UserPhoneNumber` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[number]` on the table `UserPhoneNumber` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserPhoneNumber_id_key" ON "UserPhoneNumber"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserPhoneNumber_number_key" ON "UserPhoneNumber"("number");

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
