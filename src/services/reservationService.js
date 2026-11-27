const { isValidObjectId } = require("mongoose");
const Specialty = require("../models/specialty");
const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const checkSpecialty = async (specialtyId) => {
  if (specialtyId == undefined) return;
  if (
    !isValidObjectId(specialtyId) ||
    !(await Specialty.exists({ _id: specialtyId }))
  ) {
    throw new Error("La especialidad no existe");
  }
};

exports.createReservation = async (data) => {
  await checkSpecialty(data.specialtyId);
  const conflict = await prisma.appointment.findFirst({
    where: {
      date: data.date,
      timeBlockId: data.timeBlockId,
    },
  });
  if (conflict) {
    throw new Error("El horario ya esta ocupado");
  }
  return prisma.appointment.create({ data });
};

exports.getReservation = (id) => {
  return prisma.appointment.findUnique({
    where: {
      id: parseInt(id, 10),
    },
  });
};

exports.updateReservation = async (id, data) => {
  const conflict = await prisma.appointment.findFirst({
    where: {
      date: data.date,
      timeBlockId: data.timeBlockId,
      id: {
        not: parseInt(id, 10),
      },
    },
  });
  if (conflict) {
    throw new Error("El horario ya esta ocupado");
  }
  return prisma.appointment.update({
    where: {
      id: parseInt(id, 10),
    },
    data,
  });
};

exports.deleteReservation = (id) => {
  return prisma.appointment.delete({
    where: {
      id: parseInt(id, 10),
    },
  });
};
