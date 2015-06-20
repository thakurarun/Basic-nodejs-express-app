var express = require('express');
var router = express.Router();
var customerRepo = require('./../server/Repository/CustomerRepository');
/* GET home page. */
router.get('/jade', function(req, res) {
    res.render('index', {title: 'Customer' ,LoginTitleText: 'Register yourself'});
});
router.post('/api/postuser', function(req, res) {
   customerRepo.insertOrUpdateCustomer(req.body);
   res.status(200).send({success:true, message:'We got it.'});
});
router.get('/api/listcustomer', function(req, res) {
    return customerRepo.getAllCustomer(req, res);
});
router.get('/api/getsingle',function(req,res){
   return customerRepo.getSingleCustomer(req,res); 
});
router.get('/api/deletesingle',function(req,res){
   return customerRepo.deleteSingleCustomer(req,res); 
});
router.post('/api/findcustomers',function(req,res){
   return customerRepo.findCustomers(req,res); 
});

module.exports = router;
