const express = require("express");

const { prisma } = require("../services/prisma");

const router = express.Router();

router.get("/users", async (_req, res) => {
  const users = await prisma.user.findMany({
    orderBy: { id: "asc" },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      cpf: true,
      createdAt: true,
    },
  });
  res.json(users);
});

router.post("/users", async (req, res) => {
  const { name, email, phone, cpf, password } = req.body ?? {};
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Campos obrigatórios: name, email, password" });
  }

  const created = await prisma.user.create({
    data: { name, email, phone, cpf, password },
    select: { id: true, name: true, email: true, phone: true, cpf: true, createdAt: true },
  });
  return res.status(201).json(created);
});

module.exports = { usersRouter: router };

