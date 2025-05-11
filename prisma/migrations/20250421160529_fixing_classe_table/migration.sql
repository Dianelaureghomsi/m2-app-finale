/*
  Warnings:

  - Changed the type of `name` on the `Classe` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ListeClasses" AS ENUM ('SIXIEME', 'CINQUIEME', 'QUATRIEME', 'TROISIEME', 'SECONDE', 'PREMIERE', 'TERMINALE', 'ALL');

-- AlterTable
ALTER TABLE "Classe" DROP COLUMN "name",
ADD COLUMN     "name" "ListeClasses" NOT NULL;
