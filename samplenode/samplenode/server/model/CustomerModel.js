var mongoose = require( 'mongoose' );
var db = mongoose.connect('mongodb://127.0.0.1:27017/Customer').connection;
db.on('error',function(){
    console.log('error occured.');
});
var CustomerSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    email: String
});

module.exports = db.model('Customer', CustomerSchema);