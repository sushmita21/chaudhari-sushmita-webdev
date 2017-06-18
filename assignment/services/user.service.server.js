var app = require('../../express');
var userModel = require('../model/user/user.model.server');

var passport      = require('passport');
var session      = require('express-session');
var cookieParser  = require('cookie-parser');


var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var bcrypt = require("bcrypt-nodejs"); //encrypting password


app.use(cookieParser());

//app.use(session({ secret: process.env.SESSION_SECRET }))
app.use(session({
    secret: 'this is the secret',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());



var facebookConfig = {

    /*clientID: process.env.FACEBOOK_CLIENT_ID,
     clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
     callbackURL:process.env.FACEBOOK_CALLBACK_URL,*/

    clientID: '270025373466478',
    clientSecret: 'defb3373dd87f127e917adf4c6961dca',
    callbackURL: "http://localhost:3000/auth/facebook/callback"
};
var googleConfig = {
    clientID     : '277462004038-dq088b54tg1akn2msmn0cfqc3j2egtqc.apps.googleusercontent.com',
    clientSecret : 'jZyZpNz8PofqF46qF8amNB1a',
    // callbackURL  : process.env.GOOGLE_CALLBACK_URL
    callbackURL  : "http://localhost:3000/auth/google/callback"
};


app.post  ('/api/login', passport.authenticate('local'), login);
app.post  ('/api/logout',         logout);
app.post  ('/api/register',       register);
app.get   ('/api/loggedin',       loggedin);

app.get("/api/user/", findUser);
app.get('/api/user/:userId', findUserById);
app.put('/api/user/:userId',  updateUser);
app.post('/api/user/',  createUser);
app.delete('/api/user/:userId',  deleteUser);



passport.use(new LocalStrategy(localStrategy));
passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
passport.use(new GoogleStrategy(googleConfig, googleStrategy));


app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
app.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/assignment/#/login'
    }), function(req, res){
        var url = '/assignment/#/user/' + req.user._id.toString();
        res.redirect(url);
    });

app.get('/auth/facebook',passport.authenticate('facebook',{ scope : 'email'}));
app.get('/auth/facebook/callback',passport.authenticate('facebook', {
    failureRedirect: '/assignment/#/login'
}), function(req, res){
    console.log("success redirect");
    var url = '/assignment/#/user/' + req.user._id.toString();
    console.log(url);
    res.redirect(url);
});


passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

function localStrategy(username, password, done) {
    console.log(username);
    console.log(password);
    userModel
        .findUserByUsername(username)
        .then(
            function(user) {
                console.log(user);
                if(user && bcrypt.compareSync(password, user.password)){
                    console.log("passed");
                    return done(null,user);
                }else{
                    console.log("failed");
                    return done(null,false);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        );
}


function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}

function googleStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByGoogleId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newGoogleUser = {
                        username:  emailParts[0],
                        firstName: profile.name.givenName,
                        lastName:  profile.name.familyName,
                        email:     email,
                        google: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return userModel
                        .createUser(newGoogleUser)
                        .then(function (user) {
                            return done(null, user);
                        });
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        );
}

function facebookStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByFacebookId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var names = profile.displayName.split(" ");
                    var newFacebookUser = {
                        username : names[0],
                        lastName:  names[1],
                        firstName: names[0],
                        email:     profile.emails ? profile.emails[0].value:"",
                        facebook: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return userModel.createUser(newFacebookUser);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );

}


function login(req, res) {
    console.log("in loginn");
    var user = req.user;
    res.json(user);
}

function logout(req, res) {
    req.logOut();
    res.send(200);
}

function loggedin(req, res) {
    console.log("log" + req.user);
    res.send(req.isAuthenticated() ? req.user : '0');
}


function register(req, res) {
    var user = req.body;
    //user.dateCreated = new Date();
    console.log(user.password);
    user.password = bcrypt.hashSync(user.password);
    userModel
        .createUser(user)
        .then(
            function(newUser){
                if(newUser){
                    req.login(newUser, function(err) {
                        if(err) {
                            res.status(400).send(err);
                        } else {
                            res.json(newUser);
                        }
                    });
                }
            }
        );
}

function updateUser(req, res) {
    var newUser = req.body;
    var userId = req.params.userId;
    userModel.updateUser(userId,newUser)
        .then(function (response) {
            if (response.nModified === 1) {
                userModel
                    .findUserById(userId)
                    .then(function (response) {
                        res.json(response);
                    }, function () {
                        res.sendStatus(404);
                    })
            }
            else {
                res.sendStatus(404);
            }
        }, function (err) {
            res.sendStatus(404);
        });
}

function deleteUser(req, res)
{
    var userId = req.params.userId;
    userModel.deleteUser(userId)
        .then(function (user) {
            res.sendStatus(200);
        }, function (err) {
            res.sendStatus(404);
        });
}

function createUser(req, res)
{
    var newUser = req.body;

    var newUserData =  {
        // _id : newId.toString(),
        username : newUser.username,
        password : newUser.password,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName

    };
    userModel.createUser(newUserData)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.sendStatus(404).send(err);
        });

}

function findUserById(req, res) {
    var userId = req.params['userId'];
    userModel.findUserById(userId)
        .then(function(user){
            res.json(user)
        }, function(err)
        {
            res.sendStatus(500).send(err);
        });
}

function findUserByUsername(req, res) {

    var username = req.query.username;
    userModel.findUserByUsername(username)
        .then(function(users)
        {
            if(users.length != 0) {
                res.json(users[0]);
            }
            else
            {
                res.sendStatus(404);
            }
        }, function (err) {
            res.sendStatus(404);
        });

}

function findUserByCredentials(req, res) {

    var username = req.query.username;
    var password = req.query.password;

    userModel
        .findUserByCredentials(username, password)
        .then(function (response) {
            if (response.length != 0) {
                res.json(response[0]);
            }
            else {
                res.sendStatus(404);
            }
        }, function (err) {
            res.sendStatus(404);
        });
}



function findUser(req, res)
{
    var username = req.query['username'];
    var password = req.query['password'];
    if(username && password)
    {
        findUserByCredentials(req, res);
    }
    else if(username)
    {
        findUserByUsername(req, res);
    }


}