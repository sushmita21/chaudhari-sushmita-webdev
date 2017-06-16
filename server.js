var app = require('./express');
//var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(app.express.static(__dirname + '/public'));

require ("./test/app.js")(app);
require("./assignment/app");
require("./project/app");


/* loading and configuring passport library for authentication*/
//  var passport      = require('passport');
/*var cookieParser  = require('cookie-parser');
var session       = require('express-session');

/*
app.use(session({
    secret: 'this is the secret',
    resave: true,
    saveUninitialized: true
}));
*/
/*app.use(cookieParser());*/
/*
app.use(passport.initialize());
app.use(passport.session());
*/
/*app.use(session({ secret: process.env.SESSION_SECRET }));*/


var port = process.env.PORT || 3000;

app.listen(port);