import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Cashflows extends BaseSchema {
  protected tableName = 'cashflows'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('descricao', 100).notNullable()
      table.double('valor', 8, 2)
      table.boolean('is_entrada').defaultTo(true)
      table.boolean('is_deleted').defaultTo(false)


      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
