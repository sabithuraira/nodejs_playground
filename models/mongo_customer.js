var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    address: {type: String}
});

var Customer = mongoose.model('Customer', schema);
module.exports = Customer;