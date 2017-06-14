var app = require('../../express');
var userModel = require('../model/user/user.model.server');


app.get('/api/user1', findUser);
app.get('/api/user/:userId/profile',findUserById);
app.post('/api/user',createUser);
app.post('/api/login',login);
app.post('/api/register',register);
app.post("/api/user/follow", followUser);
app.get("/api/user/:userId/followers",findAllFollowers);



function followUser(req,res){
  var followerId = req.body.followerId;
  var followingId = req.body.followingId;

  userModel.findAllFollowers(followingId)
    .then(function(followers){
      for(var f in followers){
        if(followers[f] == followerId){
          res.send('0');
          break;
        }
        else{
          return userModel.followUser(followerId,followingId);
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

  userModel.findAllFollowers(userId)
    .then(function(followers){
      res.json(followers);
    },
    function(error){
      res.sendStatus(400).send(error);
    });
}

function register(req,res){
  var user = req.body;
    userModel.createUser(user)
      .then(function(user){
        if(user){
              res.json(user);
        }
      },
      function(error){
        res.sendStatus(400).send(error);
      });
}




function login(req,res){
  var user = req.user;
  res.json(user);
}


function findUserByCredentials(req,res){
  var user,username,password;
  username = req.query.username;
  password = req.query.password;
    userModel.findUserByCredentials(username,password)
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
  userModel
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
    userModel.createUser(user)
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


  userModel.updateUser(userId,user)
       .then(function(status){
        model.userModel1.findUserById(userId)
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




function findUser(req,res){
    var query = req.query;
    var params = req.params;
    if(query.username && query.password){
        findUserByCredentials(req,res);
    }

}
