var express = require('express');
var app = express();

var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
app.use(session({
    secret : 'this is a secret',
    resave : true,
    saveUninitialized : true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

require ("./test/app.js")(app);
require ("./assignment/app.js")(app);
//require("./assignment/model/models.server")();

var port = process.env.PORT || 3000;

app.listen(port);