var mongoose = require('mongoose');

var nameSchema = new mongoose.Schema({
    name: "string"
})

var Names = mongoose.model('names', nameSchema);

var findRecord = function(){
    console.log("We'll find the record");
    var record = Names.findOne({"name": "Astha"}, function(err, found){
        if(err){
            console.log("could not find the record", err)
        }else{
            if(found == null){
                console.log("null found:");
                Names.create({
                    name: "Astha"
                }, function(err, success){
                    if(err){
                        console.log(err);
                    }else{
                        console.log("success");
                    }
                })
            }else{
                console.log("record found: ", found.name)
            }
        }
    })
}();


module.exports = Names;