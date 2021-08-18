
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return  knex('personnel').insert([
        {man_number: '05786', fname: 'Aboo', lname: 'Jung'},
        {man_number: '01573', fname: 'Dennis', lname: 'Day'},
        {man_number: '00949', fname: 'Sherlock', lname: 'Watson'}
      ]);
};

/*
table.integer('man_number').primary();
table.string('name');
*/