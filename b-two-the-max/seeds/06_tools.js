
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('tools').del()
    .then(function () {
      // Inserts seed entries
      return knex('tools').insert([
        { tool_id: '15AMXSDRILL11', descr: 'Drillbait', serv_status: '3', },
        { tool_id: '15AMXSPPK021', descr: 'Panel Party Kit', checked_out_to: '08754', serv_status: '1', },
        { tool_id: '15AMXSPAD068', descr: 'Dewalt power drill', serv_status: '1', },
        { tool_id: '15AMXSDRILL22', descr: 'Drillbait', checked_out_to: '08754', serv_status: '3', },
        { tool_id: '15AMXSPPK022', descr: 'Panel Party Kit', checked_out_to: '65432', serv_status: '1', },
        { tool_id: '15AMXSPAD123', descr: 'Dewalt power drill', serv_status: '1', },
        { tool_id: '15AMXSDRILL99', descr: 'Drillbait', checked_out_to: '08754', serv_status: '3', },
        { tool_id: '15AMXSPPK210', descr: 'Panel Party Kit', checked_out_to: '65432', serv_status: '1', },
        { tool_id: '15AMXSPAD868', descr: 'Dewalt power drill', checked_out_to: '65432', serv_status: '1', },
        { tool_id: '15AMXSDRILL76', descr: 'Drillbait', checked_out_to: '12346', serv_status: '3', },
        { tool_id: '15AMXSPPK421', descr: 'Panel Party Kit',  serv_status: '1', },
        { tool_id: '15AMXSPAD008', descr: 'Dewalt power drill', checked_out_to: '12346', serv_status: '1', },
      ]);
    });
};


/*table.increments('id');
table.string('descr');
table.string('location');
table.integer('checked_out_to'); // Come back to make this a foreign key.
table.integer('serv_status');
table.foreign('checked_out_to').references('man_number').inTable('personnel');
*/