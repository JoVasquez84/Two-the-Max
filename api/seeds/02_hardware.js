
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('hardware').del()
    .then(function () {
      // Inserts seed entries
      return knex('hardware').insert([
        {nsn: 1, descr: 'Fastener', location: 'Bin 200', unit_of_measure: 'box', qty_available: '10', qty_low_threshold:'2', pn: 'AB12'},
        {nsn: 2, descr: 'oil', location: 'Bin 210', unit_of_measure: 'quart', qty_available: '6', qty_low_threshold:'2', pn: 'AC123'},
        {nsn: 3, descr: 'Solder', location: 'Bin 211', unit_of_measure: 'spool', qty_available: '4', qty_low_threshold:'2', pn: 'ABCD1234'}
      ]);
    });
};

