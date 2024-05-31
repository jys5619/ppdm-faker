import { Connection, createPool, getConnection } from "oracledb";

export default class DbPool {
  static async getConnection(dbConfig: IDBConfig): Promise<Connection | undefined> {
    if (dbConfig.dbType === "ORACLE") {
      if (!dbConfig.poolname) {
        throw Error("pool name은 필수입력입니다.");
      }

      let connection = undefined;
      try {
        connection = await getConnection(dbConfig.poolname);
      } catch (e) {}

      if (!connection) {
        await createPool({
          user: dbConfig.username,
          password: dbConfig.password,
          connectString: dbConfig.url,
          poolMin: 1,
          poolMax: 10,
          poolTimeout: 300,
          poolAlias: dbConfig.poolname,
        });
        connection = await getConnection(dbConfig.poolname);
      }

      return connection;
    }
  }

  static async getDirectConnection(dbConfig: IDBConfig): Promise<Connection | undefined> {
    return await getConnection({
      user: dbConfig.username,
      password: dbConfig.password,
      connectString: dbConfig.url,
    });
  }
}
