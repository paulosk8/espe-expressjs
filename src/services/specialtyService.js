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

const listSpecialtiesService = async ({ q, area }) => {
  const filter = {};
  if (q) filter.name = { $regex: q, $options: "i" };
  if (area) filter.area = area;
  return await Speciality.find(filter);
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

const deleteSpecialtyService = async (id) => {
  return Speciality.findByIdAndDelete(id);
};

const deleteByAreaService = async (area) => {
  return Speciality.deleteMany({ area });
};

module.exports = {
  createSpecialtyService,
  listSpecialtiesService,
  getSpecialtiesService,
  updateSpecialtyService,
  deleteSpecialtyService,
  deleteByAreaService,
};
