const { Router } = require("express");
const {
  createSpecialty,
  listSpecialty,
  getSpecialty,
  updateSpecialty,
} = require("../controllers/specialtyController");
const router = Router();

router.post("/", createSpecialty);
router.get("/", listSpecialty);
router.get("/:id", getSpecialty);
router.patch("/:id", updateSpecialty);

module.exports = router;
