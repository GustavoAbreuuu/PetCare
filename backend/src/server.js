require("dotenv/config");

const express = require("express");
const cors = require("cors");

const { apiRouter } = require("./routes");
const { prisma } = require("./services/prisma");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", apiRouter);

const port = Number(process.env.PORT || 3000);
const server = app.listen(port, () => {
  console.log(`Servidor na porta ${port}`);
});

async function shutdown(signal) {
  console.log(`Encerrando (${signal})...`);
  server.close(() => {});
  await prisma.$disconnect().catch(() => {});
  process.exit(0);
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
