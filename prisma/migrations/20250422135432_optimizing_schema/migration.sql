/*
  Warnings:

  - You are about to drop the column `classeId` on the `Eleve` table. All the data in the column will be lost.
  - You are about to drop the `Classe` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `classe` to the `Eleve` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Eleve" DROP CONSTRAINT "Eleve_classeId_fkey";

-- AlterTable
ALTER TABLE "Eleve" DROP COLUMN "classeId",
ADD COLUMN     "classe" "ListeClasses" NOT NULL;

-- DropTable
DROP TABLE "Classe";

-- CreateTable
CREATE TABLE "NotificationParent" (
    "id" TEXT NOT NULL,
    "notificationId" TEXT NOT NULL,
    "parentId" TEXT NOT NULL,

    CONSTRAINT "NotificationParent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NotificationClasse" (
    "id" TEXT NOT NULL,
    "notificationId" TEXT NOT NULL,
    "classe" "ListeClasses" NOT NULL,

    CONSTRAINT "NotificationClasse_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NotificationParent_notificationId_parentId_key" ON "NotificationParent"("notificationId", "parentId");

-- CreateIndex
CREATE UNIQUE INDEX "NotificationClasse_notificationId_classe_key" ON "NotificationClasse"("notificationId", "classe");

-- AddForeignKey
ALTER TABLE "NotificationParent" ADD CONSTRAINT "NotificationParent_notificationId_fkey" FOREIGN KEY ("notificationId") REFERENCES "Notification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificationParent" ADD CONSTRAINT "NotificationParent_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificationClasse" ADD CONSTRAINT "NotificationClasse_notificationId_fkey" FOREIGN KEY ("notificationId") REFERENCES "Notification"("id") ON DELETE CASCADE ON UPDATE CASCADE;
