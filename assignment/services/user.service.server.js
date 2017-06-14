/*
var app = require('../../express');
var userModel = require('../model/user/user.model.server');
var passport      = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var bcrypt = require("bcrypt-nodejs"); //encrypting password
var auth = authorized;
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);



var googleConfig = {
    clientID     : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    callbackURL  : process.env.GOOGLE_CALLBACK_URL
};

app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/#/profile',
        failureRedirect: '/#/login'
    }));

app.post  ('/api/login', passport.authenticate('local'), login);
app.post  ('/api/logout',         logout);
app.post  ('/api/register',       register);
//app.post  ('/api/user',     auth, createUser);
app.get   ('/api/loggedin',       loggedin);
//app.get   ('/api/user',     auth, findAllUsers);

app.get("/api/user/", findUser);
app.get('/api/user/:userId', findUserById);
app.put('/api/user/:userId', auth, updateUser);
app.post('/api/user/', auth, createUser);
app.delete('/api/user/:userId', auth, deleteUser);


function authorized (req, res, next) {
    if (!req.isAuthenticated()) {
        res.send(401);
    } else {
        next();
    }
};



var userModel = require("../model/user/user.model.server");
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(localStrategy));
function localStrategy(username, password, done) {
    userModel
        .findUserByCredentials({username: username, password: password})
        .then(
            function(user) {
                if (!user) { return done(null, false); }
                return done(null, user);
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


passport.use(new GoogleStrategy(googleConfig, googleStrategy));

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
                    return userModel.createUser(newGoogleUser);
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
    var user = req.user;
    res.json(user);
}

function logout(req, res) {
    req.logOut();
    res.send(200);
}

function loggedin(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
}


function register(req, res) {
    var user = req.body;
    user.dateCreated = new Date();
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

    /!*var len = users.length;
     var lastUser = users[len - 1];
     var newId = parseInt(lastUser._id) + 1;
     *!/
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
    /!*users.push(newUserData);
     res.json(newUserData);
     *!/
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
    /!*for (var u in users) {
     if (users[u]._id === userId) {
     res.send(users[u]);
     return;
     }
     }
     res.sendStatus(404);
     *!/}

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
    /!*var user = users.find(function (arrUser) {
     return arrUser.username == username;
     });
     if(user) {
     res.json(user);
     } else {
     res.sendStatus(404);
     }*!/
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
/!*for(var u in users)
 {
 var user = users[u];
 if( user.username === username &&
 user.password === password)
 {
 res.json(user);
 return;
 }
 }
 res.sendStatus(404);*!/



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


}*/
