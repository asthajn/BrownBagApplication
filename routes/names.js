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

router.post('/', function(req, res){
    console.log("Adding new name: ", req.body);
    Names.findOne({"name": req.body.name}, function(err, record){
        if(err){
            console.log("Error finding name");
        }else{
            name = new Names(req.body);
            if(record == null){
                console.log("Record not exists, creating a new one")
                name.save(function(err, name) {
                    if (err){
                    return res.send(500, err);
                    }
                    return res.json(name);
                    })
            }else{
                console.log("Name already exists");
                res.json("Name already exists");
            }
        }
    })
})
module.exports = router;