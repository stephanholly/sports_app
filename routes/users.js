var express = require('express');
var router = express.Router();
var knex = require('../db/knex.js');
var bcrypt = require('bcrypt');
var Handlebars = require('hbs');
var moment = require('moment');
/* GET users listing. */


// login
router.get('/login', function(req, res, next) {
  res.render('login');
});

// submit login
router.post('/login', function(req, res, next) {
  knex.raw(`SELECT * FROM users WHERE email = '${req.body.email}'`)
    .then(function(users) {
      if (users.rows[0]) {
        bcrypt.compare(req.body.password, users.rows[0].password, function(err, resp) {
          if (resp) {
            res.cookie('user_id', users.rows[0].id)
            res.redirect(`/users/${users.rows[0].id}`)
          } else {
            res.redirect('/login')
          }
        });
      } else {
        res.redirect('/users/login')
      }
    });
});

//get create user
router.get('/new', function(req, res, next) {
  res.render('createUser', {
    title: 'Express'
  });
});

// create user
router.post('/new', function(req, res, next) {
  if (req.body.password === req.body.confirm) {
    bcrypt.hash(req.body.password, 4, function(err, hash) {
      knex.raw(`INSERT INTO users VALUES (default, '${req.body.first_name}', '${req.body.last_name}', '${req.body.email}', '${hash}')`)
        .then(function(data) {
          res.redirect('/users/login')
        })
    })
  } else {
    res.redirect('/new')
  }
});

//today function for helper method
function today() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();

  if (dd < 10) {
    dd = '0' + dd
  }
  if (mm < 10) {
    mm = '0' + mm
  }
  return today = yyyy + '-' + mm + '-' + dd;
}

//helper methods
Handlebars.registerHelper('isPast', function(items, options) {
  var out = "";
  for (var i = 0; i < items.length; i++) {
    if (new Date(items[i].date).valueOf() < new Date(today()).valueOf()) {
      out = out + `<div class='pastEvent'><br><hr><a href='/events/${items[i].event_id}' style="color:black;"><div class='title'><h3>` + items[i].title + "</h3></div></a>" + "<div class='type'>Sport: " + items[i].type + "</div><div class='date'>Date: " + items[i].date.toDateString() + "</div><div class='time'>Time: " + moment(items[i].time, "hh:mm:ss").format("h:mm A") + "</div></div>"
    }
  }
  return out;
});

Handlebars.registerHelper('isFuture', function(items, options) {
  var out = "";
  for (var i = 0; i < items.length; i++) {
    if (new Date(items[i].date).valueOf() > new Date(today()).valueOf()) {
      out = out + `<div class='upcomingEvent'><br><hr><a href='/events/${items[i].event_id}' style="color:black;"><div class='title'><h3>` + items[i].title + "</h3></div></a>" + "<div class='type'>Sport: " + items[i].type + "</div><div class='date'>Date: " + items[i].date.toDateString() + "</div><div class='time'>Time: " + moment(items[i].time, "hh:mm:ss").format("h:mm A") + "</div></div>"
    }
  }
  return out;
});


// get profile view
router.get('/:id', function(req, res, next) {
  if (req.cookies.user_id === req.params.id || req.cookies.user_id === '4') {
    knex.raw(`SELECT * FROM users where id = ${req.params.id}`)
      .then(function(user) {
        knex.raw(`SELECT * FROM events where host_id = ${req.params.id}`)
          .then(function(user1) {
            knex.raw(`SELECT * FROM events join atendee_events on events.id = atendee_events.event_id where atendee_events.user_id = ${req.params.id} `)
              .then(function(user2) {
                console.log("date", user1.rows);
                res.render('profile', {
                  userInfo: user.rows[0],
                  myEvents: user1.rows,

                  events: user2.rows,
                  userFirstName: user.rows[0].first_name,
                  userLastName: user.rows[0].last_name
                })
              })
          })
      })
  } else {
    res.redirect('/users/login');
  }
});

// delete account
router.post('/:id/delete', function(req, res, next) {
  knex.raw(`DELETE FROM users where id = '${req.params.id}'`)
    .then(function(data) {
      res.clearCookie('user_id');
      res.redirect('/')
    });
});

router.get('/:id/logout', function(req, res, next) {
  res.clearCookie('user_id');
  res.redirect('/')
});





module.exports = router;
