var express = require('express');
var router = express.Router();
var customerRepo = require('./../server/controller/Customer');
/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', {title: 'Customer' ,LoginTitleText: 'Register yourself'});
});
router.post('/postuser', function(req, res) {
   customerRepo.insertOrUpdateCustomer(req.body);
   res.status(200).send({success:true, message:'We got it.'});
});
router.get('/listcustomer', function(req, res) {
    return customerRepo.getAllCustomer(req, res);
});
router.get('/getsingle',function(req,res){
   return customerRepo.getSingleCustomer(req,res); 
});
router.get('/deletesingle',function(req,res){
   return customerRepo.deleteSingleCustomer(req,res); 
});
module.exports = router;