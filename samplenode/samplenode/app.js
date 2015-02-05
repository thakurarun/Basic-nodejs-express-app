var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jade = require('jade');
var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

console.log('sever started')


//run window console
//set debug=app & node .\bin\www
//https://help.github.com/articles/adding-an-existing-project-to-github-using-the-command-line/ --git helper
//git remote -v
//git push origin master
//mongoimport --host 127.0.0.1 --port 27017 --collection customers --db Customer --file "path to json file mock.json" --jsonArray [data import eg]

//127.0.0.1:59759
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//app.set('trust proxy', function (ip) {
//  if (ip === '127.0.0.1' || ip === '123.123.123.123') return true; // trusted IPs
//  else return false;
//})
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        console.log(err.message);
        res.send(err.message);
    });
}

//// production error handler
//// no stacktraces leaked to user
//app.use(function(err, req, res, next) {
//    res.status(err.status || 500);
//    res.render('error', {
//        message: err.message,
//        error: {}
//    });
//});


module.exports = app;
