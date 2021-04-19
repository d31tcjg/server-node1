import knex from 'knex'

const db = knex({
  client: process.env.DB_TYPE,
  connection: {
    filename: process.env.DB_FILE,
  },
  useNullAsDefault: true,
})

const createTables = async () => {
  const notesTableExists = await db.schema.hasTable('notes')
  if (!notesTableExists) {
    await db.schema.createTable('notes', (table) => {
      table.increments('id').primary()
      table.string('title')
      table.string('content')
      table.timestamps()
    })
  }
}

createTables()

export default db
