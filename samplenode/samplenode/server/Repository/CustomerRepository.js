
var mongoose = require('mongoose')
var customer = require('../model/CustomerModel');

exports.insertOrUpdateCustomer = function (_Customer,callback){ 
    if(_Customer.cid != undefined)
    { 
        customer.findByIdAndUpdate(_Customer.cid, _Customer, {upsert:true},function(err,customer){
            if(err)
                return console.log(err);
            return customer; //updated customer.
        });   
        return false;
    }
    var c = new customer(_Customer);
    c.save(function(err,customer){
        if(err)
            return console.log(err);
        return customer; //saved customer.
    });
}

exports.getAllCustomer = function (req, res){    
    var page = req.query.p;
    customer.find().sort({'fname':1}).skip(page*10).limit(10).find(function(err,result){
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
exports.getSingleCustomer = function (req, res){    
    var filter = req.query.id;
    customer.find({_id:filter}).limit(1).find(function(err,result){
        if(err)
            return res.send('error', {
                status: 500
            });
        customer.find({_id:filter}).count(function(err,count){
             return res.status(200).json({"data" : result, "count" :count});
        })
       
    }
    );
};
exports.deleteSingleCustomer = function (req, res){    
    var filter = req.query.id;
    customer.find({_id:filter}).limit(1).remove(function(err,result){
        if(err)
            return res.status(500).send(err);
        return res.status(200).json({"data" : result, "count" :1});
    });
};
exports.findCustomers = function (req, res){    
    var page = req.query.p;
    var filter = req.body;
    var col = filter.column;
    customer.find({"lname":filter.value}).limit(10).find(function(err,result){
        if(err)
            return res.send('error', {
                status: 500
            });
        customer.find({"lname":filter.value}).count(function(err,count){
            console.log(filter.value);
             return res.status(200).json({"data" : result, "count" :count});
        })
       
    }
    );
};


