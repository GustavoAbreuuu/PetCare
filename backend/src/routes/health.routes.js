const express = require("express");

const { prisma } = require("../services/prisma");

const router = express.Router();

router.get("/health", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return res.json({ ok: true, db: "up" });
  } catch (err) {
    return res.status(200).json({ ok: true, db: "down", error: err?.message });
  }
});

module.exports = { healthRouter: router };

