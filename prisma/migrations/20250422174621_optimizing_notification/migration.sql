/*
  Warnings:

  - You are about to drop the `NotificationClasse` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NotificationParent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "NotificationClasse" DROP CONSTRAINT "NotificationClasse_notificationId_fkey";

-- DropForeignKey
ALTER TABLE "NotificationParent" DROP CONSTRAINT "NotificationParent_notificationId_fkey";

-- DropForeignKey
ALTER TABLE "NotificationParent" DROP CONSTRAINT "NotificationParent_parentId_fkey";

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "targetedClasses" TEXT[],
ADD COLUMN     "targetedParents" TEXT[];

-- DropTable
DROP TABLE "NotificationClasse";

-- DropTable
DROP TABLE "NotificationParent";
