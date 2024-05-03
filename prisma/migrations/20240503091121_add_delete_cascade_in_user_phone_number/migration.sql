-- DropForeignKey
ALTER TABLE "user_phone_numbers" DROP CONSTRAINT "user_phone_numbers_user_id_fkey";

-- AddForeignKey
ALTER TABLE "user_phone_numbers" ADD CONSTRAINT "user_phone_numbers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
