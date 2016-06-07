var express = require('express');
var db = require('mongoose');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
//var users = require('./routes/users');

// Start express
var app = express();

// static content setup
app.use('/styles',  express.static(__dirname + '/bower_components/bootstrap/dist/css')); // redirect CSS bootstrap
app.use('/fonts',  express.static(__dirname + '/bower_components/bootstrap/dist/fonts')); // redirect CSS bootstrap
app.use('/styles',  express.static(__dirname + '/bower_components/font-awesome/css')); // redirect CSS bootstrap
app.use('/scripts', express.static(__dirname + '/bower_components/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/scripts', express.static(__dirname + '/bower_components/bootstrap3-dialog/dist/js')); // redirect bootstrap-dialog JS
app.use('/scripts', express.static(__dirname + '/bower_components/jquery/dist')); // redirect JS jQuery

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('view options', {
    pretty: true
});


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
    extended: true // support encoded bodies
}));
app.use(cookieParser());
// app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
//app.use('/users', users);

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
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    
    var url = req.url;

    // IMPORTANT: Your application HAS to respond to GET /health with status 200
    //            for OpenShift health monitoring

    if (url == '/health') {
        res.writeHead(200);
        res.end();
    } 
    
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;