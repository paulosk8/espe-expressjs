const { Router } = require("express");
const {
  createSpecialty,
  listSpecialty,
  getSpecialty,
  updateSpecialty,
  deleteSpecialty,
  deleteByArea,
} = require("../controllers/specialtyController");
const router = Router();

router.post("/", createSpecialty);
router.get("/", listSpecialty);
router.get("/:id", getSpecialty);
router.patch("/:id", updateSpecialty);
router.delete("/:id", deleteSpecialty);
router.delete("/area/:area", deleteByArea);

module.exports = router;
