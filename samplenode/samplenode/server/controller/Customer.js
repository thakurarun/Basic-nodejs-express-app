
var mongoose = require('mongoose')
var customer = require('../model/CustomerModel');

exports.insertCustomer = function InsertCustomer(_Customer,callback){ 
    var c = new customer(_Customer);
    c.save(function(err,customer){
        if(err)
            return console.log(err);
        return customer; //saved customer.
    });
}

exports.getAllCustomer = function getAllCustomers(req, res){    
    var page = req.query.p;
    customer.find().skip(page*10).limit(10).find(function(err,result){
        if(err)
            return res.send('error', {
                status: 500
            });
        customer.count(function(err,count){
             return res.status(200).json({"data" : result, "count" :count});
        })
       
    }
    );
};

