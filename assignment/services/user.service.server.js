var app = require('../../express');
//var model = require('user.model.server');
app.get("/api/user/", findUser);
app.get('/api/user/:userId', findUserById);
app.put('/api/user/:userId', updateUser);
app.post('/api/user/', createUser);
app.delete('/api/user/:userId', deleteUser);


var users =  [
    {_id: "123", username: "alice",    password: "alice", email: "alice@husky.neu.edu",  firstName: "Alice",  lastName: "Wonder"  },
    {_id: "234", username: "bob",      password: "bob",  email: "bob@husky.neu.edu" ,   firstName: "Bob",    lastName: "Marley"  },
    {_id: "345", username: "charly",   password: "charly", email: "charly@husky.neu.edu",  firstName: "Charly", lastName: "Garcia"  },
    {_id: "456", username: "jannunzi", password: "jannunzi", email: "jannunzi@husky.neu.edu",firstName: "Jose",   lastName: "Annunzi" },
    {_id: "567", username: "chaudhari", password: "chaudhari", email: "chaudhari.su@husky.neu.edu", firstName: "Sushmita",   lastName: "Chaudhari" }
];


function updateUser(req, res)
{
    var newUser = req.body;
    var userId = req.params.userId;
    for (var u in users)
    {
        var user = users[u];
            if (user._id === userId)
            {
                users[u].firstName = newUser.firstName;
                users[u].lastName = newUser.lastName;
                users[u].email = newUser.email;
                res.json(users[u]);
                return;
            }
    }
    res.sendStatus(404);

}

    function deleteUser(req, res)
    {
    var userId = req.params.userId;
        for (var u in users)
        {
            if (users[u]._id === userId)
            {
                users.splice(u, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

    function createUser(req, res)
    {
        var newUser = req.body;

        var len = users.length;
        var lastUser = users[len - 1];
        var newId = parseInt(lastUser._id) + 1;

        var newUserData =  {
            _id : newId.toString(),
            username : newUser.username,
            password : newUser.password
        };

        users.push(newUserData);
        res.json(newUserData);

    }

    function findUserById(req, res) {
        var userId = req.params['userId'];
        for (var u in users) {
            if (users[u]._id === userId) {
                res.send(users[u]);
                return;
            }
        }
        res.sendStatus(404);
    }

    function findUserByUsername(req, res) {

        var username = req.query.username;
        var user = users.find(function (arrUser) {
            return arrUser.username == username;
        });

        if(user) {
            res.json(user);
        } else {
            res.sendStatus(404);
        }
    }

    function findUserByCredentials(req, res) {

    var username = req.query.username;
    var password = req.query.password;
    for(var u in users)
    {
        var user = users[u];
        if( user.username === username &&
            user.password === password)
        {
            res.json(user);
            return;
        }
    }
        res.sendStatus(404);

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