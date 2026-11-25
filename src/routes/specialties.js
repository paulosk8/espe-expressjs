const { Router } = require("express");
const {
  createSpecialty,
  listSpecialty,
  getSpecialty,
} = require("../controllers/specialtyController");
const router = Router();

router.post("/", createSpecialty);
router.get("/", listSpecialty);
router.get("/:id", getSpecialty);

module.exports = router;
