/**
 * Created by Sushmita on 465/2017.
 */
(function() {
    angular
        .module("FoodApp")
        .factory("UserService", UserService);


    function UserService($http) {


        var api = {
            "register"   : register,
            "findRestaurantBySearchQuery" :findRestaurantBySearchQuery,
            "login" :login,
            "updateUser" :updateUser,
            "findUserById" : findUserById,
            "followUser" : followUser,
            "findAllFollowers" : findAllFollowers
        };
        return api;


        function findRestaurantBySearchQuery(query){
            var url = 'https://developers.zomato.com/api/v2.1/search?q='
                +query+'&apikey=cfc7b0033ff1fb172a71b6a82059592d';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });

        }

        function findAllFollowers(userId){
            var url = "/api/user/" + userId + "/followers";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function followUser(followerId,followingId){
            var url = "/api/user/follow";
            var followObj = {
                'followerId' : followerId,
                'followingId' : followingId
            };

            return $http.post(url,followObj)
                .then(function (response) {
                    return response.data;
                });
        }


        function register(user){
             return $http.post("/api/register",user)
                .then(function (response) {
                    return response.data;
                });
        }


        function login(username,password){
            var user = {
                username : username,
                password : password
            };

            return $http.post("/api/login",user)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserById(id) {
            var url = '/api/user/' +  id + '/profile';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateUser(user){
            var url = "/api/user1/" + user._id;
            return $http.put(url,user)
                .then(function (response) {
                    return response.data;
                });
        }


    }

})();
