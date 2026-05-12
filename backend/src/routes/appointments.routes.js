const express = require("express");

const { prisma } = require("../services/prisma");

const router = express.Router();

router.get("/appointments", async (_req, res) => {
  const items = await prisma.appointment.findMany({
    orderBy: { id: "asc" },
    include: {
      pet: true,
      veterinarian: { include: { user: true } },
    },
  });
  res.json(items);
});

router.post("/appointments", async (req, res) => {
  const { petId, veterinarianId, scheduledAt, reason, status } = req.body ?? {};
  if (!petId || !veterinarianId || !scheduledAt) {
    return res
      .status(400)
      .json({ error: "Campos obrigatórios: petId, veterinarianId, scheduledAt" });
  }

  const created = await prisma.appointment.create({
    data: {
      petId: Number(petId),
      veterinarianId: Number(veterinarianId),
      scheduledAt: new Date(scheduledAt),
      reason,
      status,
    },
  });
  return res.status(201).json(created);
});

module.exports = { appointmentsRouter: router };

