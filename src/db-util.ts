const DB_PATH = "D:/dev/workspace/ppdm/ppdm-server/db/dev/ppdm.db";

export function DbUtil() {
  const getDb = () => {
    const sqlite3 = require("sqlite3").verbose();
    const db = new sqlite3.Database(DB_PATH);
    return db;
  };

  const select = (sql: string): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      const db = getDb();
      const queries: any[] = [];
      db.each(
        sql,
        (err: any, row: any) => {
          if (err) {
            reject(err); // optional: you might choose to swallow errors.
          } else {
            queries.push(row); // accumulate the data
          }
        },
        (err: any) => {
          if (err) {
            reject(err); // optional: again, you might choose to swallow this error.
          } else {
            console.log(`SEL(${queries.length})`);
            resolve(queries); // resolve the promise
          }
        }
      );
      db.close();
    });
  };

  const execute = async (sqls: string[]) => {
    const db = getDb();
    for (const sql of sqls) {
      await db.run(sql, (err: any) => {
        if (err) console.log(err);
        console.log(sql);
      });
    }
  };

  return {
    select,
    execute,
  };
}
