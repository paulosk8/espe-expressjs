const {
  createSpecialtyService,
  listSpecialtiesService,
  getSpecialtiesService,
  updateSpecialtyService,
} = require("../services/specialtyService");

const handleError = (res, error) => {
  if (error.name === "ValidationError") {
    const errors = Object.values(error.errors).map((err) => err.message);
    return res.status(400).json({ error: "Datos inválidos", errors });
  }
  if (error.name === "CastError") {
    return res
      .status(400)
      .json({ error: `Valor inválido para ${error.path}: ${error.value}` });
  }
  return res.status(500).json({ error: "Error interno del servidor" });
};

const createSpecialty = async (req, res) => {
  try {
    const specialty = await createSpecialtyService(req.body);
    res.status(201).json(specialty);
  } catch (error) {
    handleError(res, error);
  }
};

const listSpecialty = async (req, res) => {
  try {
    const specialty = await listSpecialtiesService(req.query);
    res.json(specialty);
  } catch (error) {
    handleError(res, error);
  }
};

const getSpecialty = async (req, res) => {
  try {
    const specialty = await getSpecialtiesService(req.params.id);
    if (!specialty)
      return res.status(404).json({ error: "Error registro no encontrado" });
    res.json(specialty.toJSON({ virtuals: true }));
  } catch (error) {
    handleError(res, error);
  }
};

const updateSpecialty = async (req, res) => {
  try {
    const specialty = await updateSpecialtyService(req.params.id, req.body);
    if (!specialty)
      return res.status(404).json({ error: "Error registro no encontrado" });
    res.json(specialty.toJSON({ virtuals: true }));
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = {
  createSpecialty,
  listSpecialty,
  getSpecialty,
  updateSpecialty,
};
