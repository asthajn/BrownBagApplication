var express = require('express');
var router = express.Router();

var brownBag = require('../models/brownBag.js');
/* GET /Votes listing. */
router.get('/votes', function(req, res, next) {
  brownBag.find(function (err, votes) {
    if (err) return next(err);
    res.json(votes);
  });
});

router.post('/insertVote', function(req, res, next){
  var foundOne = brownBag.findOne({"name" : "Punehhhhet"});
  console.log("Found: ", foundOne.name);
  // brownBag.update()
  brownBag.create(req);
})
module.exports = router;