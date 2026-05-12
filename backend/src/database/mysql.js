const { URL } = require("node:url");
const mysql = require("mysql2/promise");

function parseMysqlUrl(databaseUrl) {
  if (!databaseUrl) {
    throw new Error("DATABASE_URL não definido");
  }

  const parsed = new URL(databaseUrl);
  if (parsed.protocol !== "mysql:") {
    throw new Error(`DATABASE_URL deve usar mysql:// (atual: ${parsed.protocol}//)`);
  }

  return {
    host: parsed.hostname,
    port: parsed.port ? Number(parsed.port) : 3306,
    user: decodeURIComponent(parsed.username),
    password: decodeURIComponent(parsed.password),
    database: parsed.pathname?.replace(/^\//, "") || undefined,
    multipleStatements: true,
  };
}

async function createServerConnection({ host, port, user, password }) {
  return mysql.createConnection({
    host,
    port,
    user,
    password,
    multipleStatements: true,
  });
}

async function createDbConnection({ host, port, user, password, database }) {
  return mysql.createConnection({
    host,
    port,
    user,
    password,
    database,
    multipleStatements: true,
  });
}

module.exports = {
  parseMysqlUrl,
  createServerConnection,
  createDbConnection,
};

