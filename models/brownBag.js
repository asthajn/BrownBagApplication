var mongoose = require('mongoose');
//create a schema
var brownBagSchema = new mongoose.Schema({
  name: "string"
});

module.exports = mongoose.model('brownBagModel', brownBagSchema);