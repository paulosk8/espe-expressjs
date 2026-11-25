const Speciality = require("../models/specialty");

const UPDATABLE_FIELDS = [
  "name",
  "code",
  "description",
  "area",
  "durationMinutes",
  "contactEmail",
  "info",
  "label",
];

const createSpecialtyService = async (data) => {
  return await Speciality.create(data);
};

const listSpecialtiesService = async () => {
  return await Speciality.find();
};
const getSpecialtiesService = async (id) => {
  return await Speciality.findById(id);
};

const updateSpecialtyService = async (id, data = {}) => {
  const specialty = await Speciality.findById(id);
  if (!specialty) return null;
  for (const field of UPDATABLE_FIELDS) {
    if (data[field] !== undefined) specialty.set(field, data[field]);
  }
  return specialty.save();
};

module.exports = {
  createSpecialtyService,
  listSpecialtiesService,
  getSpecialtiesService,
  updateSpecialtyService,
};
