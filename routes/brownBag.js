var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var brownBag = require('../models/brownBag.js');

/* GET /Votes listing. */
router.get('/votes', function(req, res) {
  brownBag.find(function (err, votes) {
    if (err) return;
    res.json(votes);
  });
});

router.route('/insertVote')
	//creates a new vote
	.post(function(req, res){
    console.log("body: ", req.body);
    var record = brownBag.findOne({"name": req.body.name}, function(err, found){
      if(err){
        console.log("error finding brownbag record");
      }else{
        var vote = new brownBag(req.body);
        if(found == null){
          console.log("Record is null, creating new record");
          vote.save(function(err, vote) {
            if (err){
              return res.send(500, err);
            }
            return res.json(vote);
          });
        }else{
          console.log("record found, updating", found);
          brownBag.update({"name": req.body.name}, {"preferred":req.body.preference, "option":req.body.option},function(err, vote) {
            if (err){
              return res.send(500, err);
            }
            return res.json(vote);
          })
        }
      }
    })
  });
      
module.exports = router;