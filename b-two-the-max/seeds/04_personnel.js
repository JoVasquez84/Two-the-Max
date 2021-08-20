
exports.seed = function (knex) {
   // Deletes ALL existing entries
    return knex('hardware').del()
      .then(function () {
        // Inserts seed entries
        return knex('personnel').insert([
          { man_number: '12345', fname: 'Tony', lname: 'Stark' },
          { man_number: '12346', fname: 'Howard', lname: 'Stark' },
          { man_number: '08754', fname: 'Iam', lname: 'Ironman' },
          { man_number: '14866', fname: 'Mary', lname: 'Stark' },
          { man_number: '23456', fname: 'Lois', lname: 'Lane' },
          { man_number: '34567', fname: 'Cat', lname: 'Mom' },
          { man_number: '45678', fname: 'Dog', lname: 'Mom' },
          { man_number: '56789', fname: 'Fish', lname: 'Mom' },
          { man_number: '98765', fname: 'Hawk', lname: 'Eye' },
          { man_number: '87654', fname: 'Black', lname: 'Widow' },
          { man_number: '76543', fname: 'Black', lname: 'Panther' },
          { man_number: '65432', fname: 'Vision', lname: 'Jarvis' },
          { man_number: '54321', fname: 'Loki', lname: 'OdinSon' },
          { man_number: '99876', fname: 'Thor', lname: 'OdinSon' },
          { man_number: '98876', fname: 'Odin', lname: 'TheKing' },
          { man_number: '98776', fname: 'Hulk', lname: 'Smash' },
          { man_number: '98766', fname: 'Captain', lname: 'America' }
        ]);
      });
  };

/*
table.integer('man_number').primary();
table.string('name');
*/