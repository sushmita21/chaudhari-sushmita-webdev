var app = require('../../express');
var userModel = require('../model/user/user.model.server');
app.get("/api/user/", findUser);
app.get('/api/user/:userId', findUserById);
app.put('/api/user/:userId', updateUser);
app.post('/api/user/', createUser);
app.delete('/api/user/:userId', deleteUser);

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

    /*var len = users.length;
     var lastUser = users[len - 1];
     var newId = parseInt(lastUser._id) + 1;
     */
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
    /*users.push(newUserData);
     res.json(newUserData);
     */
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
    /*for (var u in users) {
     if (users[u]._id === userId) {
     res.send(users[u]);
     return;
     }
     }
     res.sendStatus(404);
     */}

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
    /*var user = users.find(function (arrUser) {
     return arrUser.username == username;
     });
     if(user) {
     res.json(user);
     } else {
     res.sendStatus(404);
     }*/
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
/*for(var u in users)
 {
 var user = users[u];
 if( user.username === username &&
 user.password === password)
 {
 res.json(user);
 return;
 }
 }
 res.sendStatus(404);*/



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