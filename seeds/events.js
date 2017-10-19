exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('events').del()
    .then(function () {
      // Inserts seed entries
      return knex('events').insert([
        {title: 'BBalling in the park', location: 'A Park', date: '2017-09-03', time: '16:00', type: 'basketball', host_id: 1, description: 'playing some bball outside of the school', private: false},
        {title: 'Crunch Time', location: 'Another Park', date: '2016-09-04', time: '17:00', type: 'baseball', host_id: 2, description: 'lets play ken griffy jr baseball', private: false},
        {title: 'Footy Time', location: 'A different Park', date: '2017-09-05', time: '18:00', type: 'soccer', host_id: 3, description: 'kick it right in the old onion bag', private: false},
        {title: 'Ultimate Frizbee', location: 'Frizbee Park', date: '2017-07-10', time: '17:00', type: 'ultimate frizbee', host_id: 4, description: 'We all are going to meet at the park a play a round of ultimate! Bring whoever.', private: false},
        {title: 'Hacky Sack', location: 'My house', date: '2018-09-04', time: '12:00', type: 'hacky sack', host_id: 5, description: 'Lets chill and hack some sacks', private: false},
        {title: 'Gryffindor vs. Ravenclaw', location: 'Hogwarts', date: '1996-08-11', time: '18:00', type: 'quidditch', host_id: 6, description: 'Come see Gryffindor take down Ravenclaw!', private: false},
        {title: 'Space ball game', location: 'Earth: universe C-137', date: '2016-09-04', time: '13:00', type: 'space ball', host_id: 7, description: 'Come get *burp* wrickity wreckkkkked at space ball, bro *burp*', private: false},
        {title: 'footaball game', location: 'Lincoln Financial Field', date: '2010-01-04', time: '17:00', type: 'football', host_id: 8, description: 'lets play some good old fashion american football on the linc!', private: false}
      ]);
    });
};
