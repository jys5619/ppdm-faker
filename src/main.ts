import { DbUtil } from './db-util'
import { User } from './entity/user'

const sqls: string[] = []

console.log('>> USER 100 건')
sqls.push(...User(100))

DbUtil().insert(sqls)
