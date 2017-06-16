(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService" ,UserService);

    function UserService($http) {

        var api = {
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "updateUser": updateUser,
            "login" :login,
            "logout" :logout,
            "register":register,
            "deleteUserById": deleteUserById,
            "findUserByUsername": findUserByUsername,
            "createUser": createUser
        };
        return api;


        function register(user) {
            return $http.post("/api/register", user);
        }

        function logout() {
            return $http.post("/api/logout");
        }

        function login(user) {
            console.log(user);
            return $http.post("/api/login", user);
        }

        function findUserById(userId) {
            var url = "/api/user/" + userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
            /*for(var u in users) {
             var user = users[u];
             if(user._id === uid) {
             return user;
             }
             }
             return null;*/
        }

        function findUserByCredentials(username, password) {
            var url = "/api/user?username=" + username + "&password=" + password;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
            /* for(var u in users) {
             var user = users[u];
             if( user.username === username &&
             user.password === password) {
             return user;
             }

             }
             return null;*/
        }

        function updateUser(userId, newUser) {
            var url = "/api/user/"+ userId;
            return $http.put(url, newUser)
                .then(function (response) {
                    return response.data;
                });
            /*for(var u in users) {

             var user = users[u];
             if(user._id  === userId) {
             users[u].firstName = newUser.firstName;
             users[u].LastName = newUser.LastName;
             users[u].email = newUser.email;

             return user;
             }
             }
             return null;*/
        }

        function deleteUserById(userId) {

            var url = "/api/user/" + userId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
            /*for(var u in users) {
             var user = users[u];
             if( user._id === uid ) {
             users.splice(u,1);
             return "UserDeleted";
             }
             }
             return "UserNotFound";*/
        }

        function findUserByUsername(username) {
            var url = "/api/user?username=" + username;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
            /*for(var u in users) {
             var user = users[u];
             if( user.username === username ) {
             return user;
             }
             }
             return null; */
        }

        function createUser(newUser) {
            var url = "/api/user/";
            return $http.post(url, newUser)
                .then(function (response) {
                    return response.data;
                });

            /*var length = users.length;
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
             */
        }
    }

}) ();

