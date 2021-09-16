
exports.up = function (knex) {
  function dropCheckedOut () {
      return knex.schema.table ('tools', (table) =>
      table.dropForeign('checked_out_to'))
  }

  function dropPrimaryKey () {
      return knex.schema.table('personnel', (table) => 
      table.dropPrimary())
  }
  function alterDataTypePersonnel() {
    return knex.schema.table('personnel', (table) => {
      table.string('man_number').notNullable().alter()
      table.primary('man_number')
    })
  }

  function alterDataTypeTools() {
    return knex.schema.table('tools', (table) => {
      table.string('checked_out_to').alter()
      table.foreign('checked_out_to').references('man_number').inTable('personnel')
    })
  }

  return dropCheckedOut()
    .then (dropPrimaryKey)
    .then(alterDataTypePersonnel)
    .then(alterDataTypeTools)
}


exports.down = function(knex) {
    function revertDataTypePersonnel () {
        return knex.schema.alterTable ('personnel', (table) =>
        table.integer('man_number')
        )
    }

    function revertDataTypeTools() {
        return knex.schema.alterTable ('tools', (table) =>
        table.integer('checked_out_to')
        )
    }

    return revertDataTypePersonnel()
        .then(revertDataTypeTools)
  
};




