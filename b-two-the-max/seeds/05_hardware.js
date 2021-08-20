exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('hardware').del()
      .then(function () {
        // Inserts seed entries
        return knex('hardware').insert([
          {nsn: 1, descr: 'Fastener', location: 'Bin 200', unit_of_measure: 'box', qty_available: '10', qty_low_threshold:'2', pn: 'AB12'},
          {nsn: 2, descr: 'oil', location: 'Bin 210', unit_of_measure: 'quart', qty_available: '6', qty_low_threshold:'2', pn: 'AC123'},
          {nsn: 3, descr: 'Solder', location: 'Bin 211', unit_of_measure: 'spool', qty_available: '4', qty_low_threshold:'2', pn: 'ABCD1234'},
          {nsn: 4, descr: 'bolt', location: 'Bin3 423', unit_of_measure: 'box', qty_available: '10', qty_low_threshold:'5', pn: 'SGFG09873'},
          {nsn: 5, descr: 'wrench', location: 'Bin 342', unit_of_measure: 'quart', qty_available: '6', qty_low_threshold:'8', pn: 'GFKL98'},
          {nsn: 6, descr: 'nut', location: 'Bin 343', unit_of_measure: 'spool', qty_available: '4', qty_low_threshold:'2', pn: 'GFL343'},
          {nsn: 7, descr: 'driver', location: 'Bin 156', unit_of_measure: 'each', qty_available: '10', qty_low_threshold:'5', pn: 'FVDF344'},
          {nsn: 8, descr: 'charger', location: 'Bin 412', unit_of_measure: 'volt', qty_available: '6', qty_low_threshold:'2', pn: 'AFDB34'},
          {nsn: 9, descr: 'wire', location: 'Bin 413', unit_of_measure: 'spool', qty_available: '40', qty_low_threshold:'20', pn: 'DFAJK33'},
          {nsn: 10, descr: 'Solder', location: 'Bin 314', unit_of_measure: 'spool', qty_available: '400', qty_low_threshold:'20', pn: 'XYZ1234'}
        ]);
      });
  };
  
  