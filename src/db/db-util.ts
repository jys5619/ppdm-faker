import DbPool from "./db-pool";

async function select(dbconfig: IDBConfig) {
  const connection = await DbPool.getConnection(dbconfig);
  if (!connection) {
    throw Error("Oracle Connection Error");
  }

  const result = await connection.execute(`SELECT * FROM TB_EMP`);
  console.log("Result is:", result.rows?.length);

  await connection.close(); // Always close connections
}

const dbconfig: IDBConfig = {
  dbType: "ORACLE",
  dbName: "개발DB",
  poolname: "ppdm_dev",
  username: "ppdm",
  password: "ppdm12",
  url: "localhost:1521/ORCL",
};
async function run() {
  await select(dbconfig);
}

run();
