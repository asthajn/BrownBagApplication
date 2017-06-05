var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var brownBag = require('../models/brownBag.js');
/* GET /todos listing. */
router.get('/', function(req, res, next) {
  brownBag.find(function (err, names) {
    if (err) return next(err);
    res.json(names);
  });
});
module.exports = router;