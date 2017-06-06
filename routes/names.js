var express = require('express');
var router = express.Router();

var Names = require('../models/names.js');
/* GET /names listing. */
router.get('/', function(req, res, next) {
    console.log("here");
  Names.find(function (err, names) {
    if (err) console.log(err);
    else
    //return names;
    res.json(names);
  });
});
module.exports = router;