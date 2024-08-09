/*
  Warnings:

  - You are about to drop the column `price` on the `Avatar` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Avatar" DROP COLUMN "price";

-- AlterTable
ALTER TABLE "UserAnswer" ALTER COLUMN "score" SET DEFAULT 0;
