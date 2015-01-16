var express = require('express');
var router = express.Router();
var customerRepo = require('./../server/controller/Customer');
/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', {title: 'Customer' ,LoginTitleText: 'Register yourself'});
});

router.post('/postuser', function(req, res) {
   customerRepo.insertCustomer(req.body)
   res.status(200).send({success:true, message:'We got it.'});
});

module.exports = router;
