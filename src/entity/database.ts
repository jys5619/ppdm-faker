import { fakerKO as faker } from '@faker-js/faker'

export function Database() {
  const database = []

  const id = faker.string.uuid()
  const dbType = 'ORACLE'
  const dbName = 'DEV'
  const connectString = 'localhost:1521/ORCL'
  const username = 'ppdm'
  const password = 'ppdm12'
  const poolMin = 1
  const poolMax = 3
  const timeout = 300
  const dbInfo = '사용자에게 보여줄 DB 정보'
  const state = 'Active'
  const createdAt = faker.date.past().toISOString().slice(0, 19).replace('T', ' ')
  const updatedAt = faker.date.recent().toISOString().slice(0, 19).replace('T', ' ')

  database.push({
    id,
    dbType,
    dbName,
    connectString,
    username,
    password,
    poolMin,
    poolMax,
    timeout,
    dbInfo,
    state,
    createdAt,
    updatedAt,
  })

  const result: string[] = []

  database.forEach((data) => {
    result.push(
      `INSERT INTO TB_DATABASE (ID, DB_TYPE, DB_NAME, CONNECT_STRING, USERNAME, PASSWORD, POOL_MIN, POOL_MAX, TIMEOUT, DB_INFO, STATE, CREATED_AT, UPDATED_AT) 
       VALUES ('${data.id}','${data.dbType}','${data.dbName}','${data.connectString}','${data.username}','${data.password}',${data.poolMin},${data.poolMax},${data.timeout},'${data.dbInfo}','${data.state}','${data.createdAt}','${data.updatedAt}');`,
    )
  })

  console.log('CREATE TB_USER'.padEnd(80, '-') + `(${result.length})`)
  return { database, result }
}
