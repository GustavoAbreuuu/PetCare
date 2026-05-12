const fs = require("node:fs/promises");
const path = require("node:path");

function splitSqlStatements(sqlText) {
  return sqlText
    .split(";")
    .map((s) => s.trim())
    .filter(Boolean);
}

async function readSqlFile(filePath) {
  const absolutePath = path.resolve(filePath);
  return fs.readFile(absolutePath, "utf8");
}

module.exports = {
  splitSqlStatements,
  readSqlFile,
};

