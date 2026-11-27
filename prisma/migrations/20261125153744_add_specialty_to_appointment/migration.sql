-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "specialtyId" TEXT;

-- CreateIndex
CREATE INDEX "Appointment_specialtyId_idx" ON "Appointment"("specialtyId");
