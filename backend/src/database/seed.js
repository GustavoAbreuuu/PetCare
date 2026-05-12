const path = require("node:path");

const { createDbConnection, parseMysqlUrl } = require("./mysql");
const { readSqlFile, splitSqlStatements } = require("./sqlRunner");

async function run() {
  const cfg = parseMysqlUrl(process.env.DATABASE_URL);
  if (!cfg.database) {
    throw new Error("DATABASE_URL precisa apontar para um database (ex: /petshop)");
  }

  const dbConn = await createDbConnection(cfg);
  try {
    const sqlPath = path.join(__dirname, "seeders.sql");
    const sqlText = await readSqlFile(sqlPath);
    const statements = splitSqlStatements(sqlText);
    for (const statement of statements) {
      await dbConn.query(statement);
    }
  } finally {
    await dbConn.end();
  }

  console.log(`Seed executado com sucesso em '${cfg.database}'.`);
}

run().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
