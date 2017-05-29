(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService" ,UserService);

    function UserService() {
        var users =  [
            {_id: "123", username: "alice",    password: "alice", email: "alice@husky.neu.edu",  firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",  email: "bob@husky.neu.edu" ,   firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly", email: "charly@husky.neu.edu",  firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", email: "jannunzi@husky.neu.edu",firstName: "Jose",   lastName: "Annunzi" },
            {_id: "567", username: "chaudhari", password: "chaudhari", email: "chaudhari.su@husky.neu.edu", firstName: "Sushmita",   lastName: "Chaudhari" }
            ];

        var api = {
            "findUserByCredentials" : findUserByCredentials,
            "findUserById" : findUserById,
            "updateUser" : updateUser,
            "deleteUserById" : deleteUserById,
            "findUserByUsername" : findUserByUsername,
            "createUser" : createUser
        };
        return api;
        function findUserById(uid) {

            for(var u in users) {
                var user = users[u];
                if(user._id === uid) {
                    return user;
                }
            }
            return null;
        }
        function findUserByCredentials(username, password) {
            for(var u in users) {
                var user = users[u];
                if( user.username === username &&
                    user.password === password) {
                    return user;
                }

            }
            return null;
        }
        function updateUser(userId , newUser) {

            for(var u in users) {

                var user = users[u];
                if(user._id  === userId) {
                    users[u].firstName = newUser.firstName;
                    users[u].LastName = newUser.LastName;
                    users[u].email = newUser.email;

                    return user;
                }
            }
            return null;
        }
        function deleteUserById(uid) {
            for(var u in users) {
                var user = users[u];
                if( user._id === uid ) {
                    users.splice(u,1);
                    return "UserDeleted";
                }
            }
            return "UserNotFound";
        }

        function findUserByUsername(username) {

            for(var u in users) {
                var user = users[u];
                if( user.username === username ) {
                    return user;
                }
            }
            return null;
        }

        function createUser(newUser) {

            var length = users.length;
            var lastUser   = users[length - 1];
            var newId = parseInt(lastUser._id) + 1;

            var newUserInfo =  {
                _id : newId.toString(),
                username : newUser.username,
                password : newUser.password
            };

            users.push(newUserInfo);
            return newUserInfo;
        }

    }

}) ();

