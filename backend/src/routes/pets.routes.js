const express = require("express");

const { prisma } = require("../services/prisma");

const router = express.Router();

router.get("/pets", async (_req, res) => {
  const pets = await prisma.pet.findMany({
    orderBy: { id: "asc" },
    include: {
      user: { select: { id: true, name: true, email: true } },
    },
  });
  res.json(pets);
});

router.post("/pets", async (req, res) => {
  const { userId, name, species, breed, gender, dateBirth } = req.body ?? {};
  if (!userId || !name) {
    return res.status(400).json({ error: "Campos obrigatórios: userId, name" });
  }

  const created = await prisma.pet.create({
    data: {
      userId: Number(userId),
      name,
      species,
      breed,
      gender,
      dateBirth: dateBirth ? new Date(dateBirth) : undefined,
    },
  });
  return res.status(201).json(created);
});

module.exports = { petsRouter: router };

