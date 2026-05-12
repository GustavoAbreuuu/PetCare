const express = require("express");

const { healthRouter } = require("./health.routes");
const { usersRouter } = require("./users.routes");
const { petsRouter } = require("./pets.routes");
const { appointmentsRouter } = require("./appointments.routes");

const router = express.Router();

router.get("/", (_req, res) => {
  res.json({ name: "PETCARE+ API", ok: true });
});

router.use(healthRouter);
router.use(usersRouter);
router.use(petsRouter);
router.use(appointmentsRouter);

module.exports = { apiRouter: router };

