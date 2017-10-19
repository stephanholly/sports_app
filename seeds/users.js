var bcrypt = require('bcrypt');
const saltRounds = 2;

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([{
          first_name: 'Michael',
          last_name: 'Jordan',
          email: 'belikemike@air.net',
          password: `${bcrypt.hashSync("spacejam", saltRounds)}`
        },
        {
          first_name: 'Mark',
          last_name: 'McGuire',
          email: 'getbig@steroids.net',
          password: `${bcrypt.hashSync("juicin", saltRounds)}`
        },
        {
          first_name: 'Fernando',
          last_name: 'Torres',
          email: 'neverwalkalone@lp.net',
          password: `${bcrypt.hashSync("football", saltRounds)}`
        },
        {
          first_name: 'admin',
          last_name: 'user',
          email: 'admin@admin.com',
          password: `${bcrypt.hashSync("admin123", saltRounds)}`
        }
      ]);
    });
};
