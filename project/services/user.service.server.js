var app = require('../../express');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");
var multer = require('multer');

var userModel1 = require('../model/user/user.model.server');

var upload = multer({ dest: __dirname+'/../../public/project/uploads' });
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

app.use(session({
secret: 'this is the secret',
resave: true,
saveUninitialized: true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.get('/api/user1', findUser);
app.get('/api/user/:userId/profile',findUserById);
app.post('/api/user',createUser);
app.put('/api/user1/:userId',loggedInAndSelf,updateUser);
app.delete('/api/user/:userId',loggedInAndSelf,deleteUser);
app.post('/api/login',passport.authenticate('local'),login);
app.post('/api/checkLogin',checkLogin);
app.post('/api/checkAdmin', checkAdmin);
app.post('/api/logout',logout);
app.post('/api/register',register);
app.post("/api/upload1", upload.single('myFile'), uploadImage);
app.get("/api/review/user/:userId", findReviewsForUser);
app.post("/api/user/follow", followUser);
app.get("/api/user/:userId/followers",findAllFollowers);

app.get('/auth/google',passport.authenticate('google', { scope : ['profile', 'email'] }));
app.get   ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

app.get('/auth/facebook/callback',
passport.authenticate('facebook', {
    successRedirect: '/project/#/user',
    failureRedirect: '/project/#/login'
}));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/project/#/user',
        failureRedirect: '/project/#/login'
    }));


var facebookConfig = {
    clientID        : process.env.FACEBOOK_CLIENT_ID || '1838483556403903',
    clientSecret    : process.env.FACEBOOK_CLIENT_SECRET || '66ce884a4e6ca3fbe9261f1e99d127aa',
    callbackURL     : process.env.FACEBOOK_CALLBACK_URL || 'http://localhost:3000/auth/facebook/callback'
};


var googleConfig = {
    clientID        : '110146154764-2ln4chaa9qh638qcivb8q52ei3c8g791.apps.googleusercontent.com',
    clientSecret    : '6z6C7UC56IRB-rI46lBauRcF',
    callbackURL     : process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3000/auth/google/callback'
};

passport.use(new LocalStrategy(localStrategy));
passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
passport.use(new GoogleStrategy(googleConfig, googleStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

function loggedInAndSelf(req,res,next){
  var loggedIn = req.isAuthenticated();
  var userId = req.params.userId;
  var self = userId == req.user._id;

  if(self && loggedIn){
    next();
  }else{
    res.sendStatus(400);
  }
}

function facebookStrategy(token, refreshToken, profile, done) {
   userModel1
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
                    return userModel1.createUser(newFacebookUser);
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

function googleStrategy(token, refreshToken, profile, done) {

    userModel1
        .findUserByGoogleId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var names = profile.displayName.split(" ");
                    var newGoogleUser = {
                        username : names[0],
                        lastName:  names[1],
                        firstName: names[0],
                        email:     profile.emails ? profile.emails[0].value:"",
                        google: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return userModel1.createUser(newGoogleUser);
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

function findReviewsForUser(req,res){
  var userId = req.params.userId;
  userModel1.findReviewsByUser(userId)
    .then(function(reviews){
      res.json(reviews);
    },
    function(error){
      res.sendStatus(400).send(error);
    });

}

function followUser(req,res){
  var followerId = req.body.followerId;
  var followingId = req.body.followingId;

  userModel1.findAllFollowers(followingId)
    .then(function(followers){
      for(var f in followers){
        if(followers[f] == followerId){
          res.send('0');
          break;
        }
        else{
          return userModel1.followUser(followerId,followingId);
        }
      }
    },
    function(error){
      res.sendStatus(400).send(error);
    })
    .then(function(followingObj){
      res.json(followingObj.followers);
    },
    function(error){
      res.sendStatus(400).send(error);
    });

}

function findAllFollowers(req,res){
  var userId = req.params.userId;

  userModel1.findAllFollowers(userId)
    .then(function(followers){
      res.json(followers);
    },
    function(error){
      res.sendStatus(400).send(error);
    });
}

function register(req,res){
  var user = req.body;
  user.password = bcrypt.hashSync(user.password);
  userModel1.createUser(user)
      .then(function(user){
        if(user){
          req.login(user,function(err){
            if(err){
              res.sendStatus(400).send(err);
            }else{
              res.json(user);
            }
          });
        }
      },
      function(error){
        res.sendStatus(400).send(error);
      });
}

function logout(req,res){
  req.logout();
  res.send(200);
}

 function checkLogin(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
}

function checkAdmin(req, res) {

    var loggedIn = req.isAuthenticated() ;
    var isAdmin = req.user.role == "ADMIN";

    if(loggedIn && isAdmin) {
        res.json(req.user);
    } else {
        res.send('0');
    }
}

function localStrategy(username,password,done){

  userModel1.findUserByUsername(username)
        .then(function(user){
          if(user && bcrypt.compareSync(password, user.password)){
            return done(null,user);
            }else{
              return done(null,false);
            }




        },
        function (error){
          res.sendStatus(400).send(error);
        });
}

function login(req,res){
  var user = req.user;
  res.json(user);
}

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel1
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

function findUserByUsername(req,res){
  var user,username;
  username = req.query.username;
  for( var u in users){
      if(users[u].username === username){
        user = users[u];
        res.send(user);
        return;
      }
  }
  res.send('0');
}

function findUserByCredentials(req,res){
  var user,username,password;
  username = req.query.username;
  password = req.query.password;
  userModel1.findUserByCredentials(username,password)
        .then(function(user){
          if(user){
            if(user.length != 0){
              res.send(user[0]);
            }
            else{
              res.send('0');
            }

        }

        },
        function (error){
          res.sendStatus(400).send(error);
        });
}

function findUserById(req,res){
  var userId = req.params.userId;
  userModel1
      .findUserById(userId)
      .then(function(user){

        if(user){
          res.send(user);
        }
        else{
          res.send('0');
        }


      },
      function(error){
        res.sendStatus(400).send(error);
      })

}

function createUser(req,res){
  var user = req.body;
    userModel1.createUser(user)
      .then(function(newUser){
        res.send(newUser);
      },
      function(error){
        res.sendStatus(400).send(error);
      });

}

function updateUser(req,res){

  var user = req.body;
  var userId = req.params.userId;


  userModel1.updateUser(userId,user)
       .then(function(status){
        userModel1.findUserById(userId)
          .then(function(user){

          res.json(user);
          },
          function(error){
            res.sendStatus(400).send(error);
          });
       },
       function(error){
        res.sendStatus(400).send(error);
       });

}

function deleteUser(req,res){
  var userId = req.params.userId;
  userModel1.deleteUser(userId)
        .then(function(status){
          res.send(200);
        },
        function(error){
          res.sendStatus(400).send(error);
        });
}



function findUser(req,res){
    var query = req.query;
    var params = req.params;
    if(query.username && query.password){
        findUserByCredentials(req,res);
    }
    else if(query.username){
        findUserByUsername(req,res);
    }else{
    res.json(req.user);
  }
}

function uploadImage(req, res) {

    var width         = req.body.width;
    var myFile        = req.file;
   var userId        = req.body.userId;


    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;


    model.userModel1.findUserById(userId)
          .then(function(user){
            user.imageUrl = "/project/uploads/" + filename;
            userModel1.updateUser(userId,user)
              .then(function(status){
                res.redirect("/project/#/user/" + userId);
              },
              function(error){
                res.statusCode(400).send(error);
              });

          },
          function(error){
            res.statusCode(400).send(error);
          });


};