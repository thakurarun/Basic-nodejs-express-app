var express = require('express');
var router = express.Router();
var user = require('./../server/model/User');
var fs = require('fs');
var outputFilename = './tempdata/data.json';
/* GET home page. */
router.get('/', function(req, res) {
    user.testFunct();
    res.render('index', {title: user.title, LoginTitleText: user.LoginTitleText})
});

router.post('/postuser', function(req, res) {
   console.log(JSON.stringify(req.body));
    writeUserToFile(req.body)
   res.status(200).send({success:true, message:'We got it.'});
});

function writeUserToFile(obj)
{
        fs.writeFile(outputFilename, JSON.stringify(obj, null, 4), function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log("JSON saved to " + outputFilename);
        }
    }); 
}






module.exports = router;
