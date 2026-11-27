const { Router } = require("express");
const authRouter = require("./auth");
const adminRouter = require("./admin");
const reservations = require("./reservations");
const appointments = require("./appointments");
const specialties = require("./specialties");
const reviews = require("./reviews");

const router = Router();

router.use("/auth", authRouter);
router.use("/admin", adminRouter);
router.use("/specialties", specialties);
router.use("/reservations", reservations);
router.use("/users", appointments);
router.use("/reviews", reviews);

module.exports = router;