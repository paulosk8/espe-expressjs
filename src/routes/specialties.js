const { Router } = require("express");
const authenticateToken = require("../middlewares/auth");

const {
  createSpecialty,
  listSpecialty,
  getSpecialty,
  updateSpecialty,
  deleteSpecialty,
  deleteByArea,
} = require("../controllers/specialtyController");
const router = Router();

router.post("/", authenticateToken, createSpecialty);
router.get("/", listSpecialty);
router.get("/:id", getSpecialty);
router.patch("/:id", authenticateToken, updateSpecialty);
router.delete("/:id", authenticateToken, deleteSpecialty);
router.delete("/area/:area", authenticateToken, deleteByArea);

module.exports = router;
