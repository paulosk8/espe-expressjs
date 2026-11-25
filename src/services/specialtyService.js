const Speciality = require("../models/specialty");

const createSpecialtyService = async (data) => {
  return await Speciality.create(data);
};

const listSpecialtiesService = async () => {
  return await Speciality.find();
};
const getSpecialtiesService = async (id) => {
  return await Speciality.findById(id);
};

module.exports = {
  createSpecialtyService,
  listSpecialtiesService,
  getSpecialtiesService,
};
