export function DbUtil() {
  const insert = (sqls: string[]) => {
    const sqlite3 = require('sqlite3').verbose()
    let db = new sqlite3.Database('D:/dev/workspace/ppdm/dev/ppdm.db')

    for (const sql of sqls) {
      db.run(sql, function (err: any) {
        if (err) {
          return console.error(err.message)
        }
      })
    }

    db.close()
  }

  return {
    insert,
  }
}
