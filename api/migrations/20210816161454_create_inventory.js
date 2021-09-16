
exports.up = function(knex) {

    function createHardwareTable() {
        return knex.schema.createTable('hardware', table => {
            table.integer('nsn').primary();
            table.string('pn', 100);
            table.string('descr');
            table.string('location');
            table.string('unit_of_measure');
            table.integer('qty_available');
            table.integer('qty_low_threshold');
        });
    }

    function createPersonnelTable() {
        return knex.schema.createTable('personnel', table => {
            table.integer('man_number').primary();
            table.string('fname', 256);
            table.string('lname', 256);
        });
    }

    function createToolsTable() {
        return knex.schema.createTable('tools', table => {
            table.increments('id');
            table.string('tool_id');
            table.string('descr');
            table.integer('checked_out_to'); // Come back to make this a foreign key.
            table.integer('serv_status');
            table.foreign('checked_out_to').references('man_number').inTable('personnel');
        });
    }

    return createPersonnelTable()
        .then(createToolsTable)
        .then(createHardwareTable);

};

exports.down = function(knex) {
    return knex.schema.dropTable('hardware').then(() => {return knex.schema.dropTable('tools').then(() => {return knex.schema.dropTable('personnel');});});
};
