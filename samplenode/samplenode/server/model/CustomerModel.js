var mongoose = require( 'mongoose' );
var db = mongoose.connect('mongodb://127.0.0.1:27017/Customer');
var CustomerSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    email: String
});

module.exports = db.model('Customer', CustomerSchema)

//var User = {
//    title : 'Customer-' + Date.now(),
//    LoginTitleText : 'Register yourself',
//    GetAllUsers : getAllUsers,
//    Users : []
//}
//
//function getAllUsers()
//{
//    var u = [];
//    for(var i = 1; i< 10;i++)
//    {
//        u.push({ 'fname' : i+'abc', 'lname' : i+'xyz', 'email' : i+'arun@mail.com' })
//    }
//    this.Users = u;
//    this.title = 'Customer-' + Date.now();
//}
//module.exports = User;