import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

const adapter = new JSONFile('db.json')
const db = new Low(adapter, { users: [] }) // вот здесь добавили defaultData

await db.read()

// Если файл пустой, запишем структуру по умолчанию
db.data ||= { users: [] }
await db.write()

export { db }
