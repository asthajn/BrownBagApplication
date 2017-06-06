var mongoose = require('mongoose');

var nameSchema = new mongoose.Schema({
    name: "string"
})

var Names = mongoose.model('names', nameSchema);

var findRecord = function(){
    console.log("We'll find the record");
    var record = Names.findOne({name: "Astha"})
    if(record.name != undefined){
        console.log("Record found with name: ", record.name);
    }else{
        Names.create({
            name: "Astha"
        }, function(err, success){
            if(err){
                console.log(err);
            }else{
                console.log("success");
            }
        })
    }
}();


module.exports = Names;