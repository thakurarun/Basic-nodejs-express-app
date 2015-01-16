var db = require('../model/CustomerModel').db;

exports.insertCustomer = function InsertCustomer(Customer,callback){
   // console.log(JSON.stringify(Customer));
//    _Customer.fname = Customer.fname;
//    _Customer.lname = Customer.lname;
//    _Customer.email = Customer.email;
    var customers = db.collection('customers')
    customers.insert({ Customer},function(obj,customers){
        console.log(obj);
    })
   //customerDb.insert(Customer);
}
