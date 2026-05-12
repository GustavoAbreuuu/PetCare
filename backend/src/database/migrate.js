const path = require("node:path");

const { createDbConnection, createServerConnection, parseMysqlUrl } = require("./mysql");
const { readSqlFile, splitSqlStatements } = require("./sqlRunner");

function extractDatabaseName(statements, fallbackName) {
  const createDb = statements.find((s) => /^CREATE\s+DATABASE\b/i.test(s));
  if (!createDb) return fallbackName;

  const match = createDb.match(/^CREATE\s+DATABASE\s+`?([a-zA-Z0-9_]+)`?/i);
  return match?.[1] || fallbackName;
}

async function run() {
  const cfg = parseMysqlUrl(process.env.DATABASE_URL);
  const sqlPath = path.join(__dirname, "migration.sql");
  const sqlText = await readSqlFile(sqlPath);
  const statements = splitSqlStatements(sqlText);
  const databaseName = extractDatabaseName(statements, cfg.database || "petshop");

  const serverConn = await createServerConnection(cfg);
  try {
    await serverConn.query(`CREATE DATABASE IF NOT EXISTS \`${databaseName}\``);
  } finally {
    await serverConn.end();
  }

  const dbConn = await createDbConnection({ ...cfg, database: databaseName });
  try {
    for (const statement of statements) {
      if (/^CREATE\s+DATABASE\b/i.test(statement)) continue;
      if (/^USE\b/i.test(statement)) continue;
      await dbConn.query(statement);
    }
  } finally {
    await dbConn.end();
  }

  console.log(`Migração aplicada com sucesso em '${databaseName}'.`);
}

run().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
