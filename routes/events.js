var express = require('express');
var router = express.Router();
var knex = require('../db/knex.js');
var bcrypt = require('bcrypt');
var Handlebars = require('hbs');
var moment = require('moment');


// date helper
Handlebars.registerHelper('formatDate', function (date, format) {
    var mmnt = moment(date);
    return mmnt.format(format);
});

Handlebars.registerHelper('formatTime', function (time, format) {
    var mmnt = moment(time, "hh:mm:ss");
    return mmnt.format(format);
});



/* GET individual indevents page. */
router.get('/:id', function(req, res, next) {
  if (req.cookies.user_id) {
    knex.raw(`SELECT events.*, users.first_name FROM events JOIN atendee_events ON atendee_events.event_id = events.id JOIN users ON users.id = atendee_events.user_id WHERE events.id = ${req.params.id}`)
      .then(function(data) {
        console.log(data.rows[0].date.toDateString());
        res.render('indEvent', {
          events: data.rows,
          routeId: data.rows[0].id,
          cookie: req.cookies.user_id,
          eventDate: data.rows[0].date.toDateString()
        });
      });
  } else {
    res.redirect("/")
  }
});

//update/rsvp for ind event
router.post('/:id', function(req, res, next) {
  if (req.cookies.user_id) {
    knex.raw(`select users.id from users inner join atendee_events on (users.id = atendee_events.user_id) where atendee_events.event_id = ${req.params.id}`)
    .then(function(data4) {
      let checkArr = data4.rows.map(a => Number(a.id))
      let cookie = Number(req.cookies.user_id)
    if (checkArr.includes(cookie) === false) {
      knex.raw(`INSERT INTO atendee_events VALUES (default, ${req.cookies.user_id}, ${req.params.id})`)
      .then(function(data3) {
        res.redirect(`/events/${req.params.id}`);
      })
    }else {
      res.redirect(`/events/${req.params.id}`);
    }
    })
  } else {
    res.redirect(`/events/${req.params.id}`);
  }
});

//get edit event
router.get('/:id/edit', function(req, res, next) {
  knex.raw(`SELECT * FROM events WHERE id = ${req.params.id}`)
    .then(function(info) {
      res.render("editEvent", {
        eventInfo: info.rows[0],
        eventInfoDate: info.rows[0].date.toDateString(),
        cookie: req.cookies.user_id
      })
    })
})


escape = (str) => {
  return str.replace("'", "''")
}
//post edit/update event
router.post('/:id/edit', function(req, res, next) {
  let editDescript = escape(req.body.description)
  knex.raw(`UPDATE events SET title = '${req.body.title}', location = '${req.body.location}', date = '${req.body.date}', time = '${req.body.time}', type = '${req.body.type}', description = '${editDescript}', private = ${req.body.private} WHERE events.id = ${req.params.id}`)
    .then(function(info) {
      res.redirect(`/users/${req.cookies.user_id}`)
    })
})

//delete event
router.post('/:id/delete', function(req, res, next) {
  knex.raw(`DELETE FROM events WHERE id = ${req.params.id}`)
    .then(function(info) {
      res.redirect(`/users/${req.params.id}`)
    })
})

module.exports = router;
