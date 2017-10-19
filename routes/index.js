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

// time helper
Handlebars.registerHelper('formatTime', function (time, format) {
    var mmnt = moment(time, "hh:mm:ss");
    return mmnt.format(format);
});


// get splash
router.get('/', function(req, res, next) {
  res.render('index');
});

//get search
router.get('/search', function(req, res, next) {
  if (req.cookies.user_id) {
    res.render('search', {
      cookie: req.cookies.user_id
    });
  }
});


//get results
router.post('/results/type', function(req, res, next) {
  if (req.cookies.user_id && req.body.type) {
    knex.raw(`SELECT * FROM events WHERE events.type = '${req.body.type}'`)
      .then(function(typeData) {
        console.log(typeData.rows);
        res.render('results', {
          results: typeData.rows,
          cookie: req.cookies.user_id
        });
      });
  } else {
    res.redirect('/search');
  }
});

router.post('/results/date', function(req, res, next) {
  console.log(req.body)
  if (req.cookies.user_id && req.body.date) {
    knex.raw(`SELECT * FROM events WHERE events.date = '${req.body.date}'`)
      .then(function(dateData) {
        console.log(dateData.rows)
        res.render('results', {
          results: dateData.rows,
          cookie: req.cookies.user_id
        });
      });
  } else {
    res.redirect('/search');
  }
});

router.post('/results/all', function(req, res, next) {
  console.log(req.body);
  if (req.cookies.user_id) {
    knex.raw(`SELECT * FROM events`)
      .then(function(allData) {
        console.log(allData.rows);
        res.render('results', {
          results: allData.rows,
          cookie: req.cookies.user_id
        });
      });
  }
});


//get create new event form
router.get('/newEvent', function(req, res, next) {
  if (req.cookies.user_id) {
    res.render('newEvent', {
      cookie: req.cookies.user_id
    });
  }
});


escape = (str) => {
  return str.replace("'", "''")
}


//post create new event form
router.post('/newEvent', function(req, res, next) {
  if (req.cookies.user_id) {
    let descript = escape(req.body.description)
    console.log(descript)
    knex.raw(`INSERT INTO events VALUES (default, '${req.body.title}', '${req.body.location}', '${req.body.date}', '${req.body.time}', '${req.body.type}', '${req.cookies.user_id}', '${descript}', ${req.body.private}) RETURNING id`)
      .then(function(data) {
        console.log(data.rows[0].id)
        knex.raw(`INSERT INTO atendee_events VALUES (default, ${req.cookies.user_id}, ${data.rows[0].id})`)
          .then(function() {
            res.redirect(`/users/${req.cookies.user_id}`);
          })
      });
  } else {
    res.redirect('/');
  }
});



module.exports = router;
