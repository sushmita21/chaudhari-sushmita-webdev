/**
 * Created by Himanshu on 4/5/2017.
 */
(function() {
    angular
        .module("FoodApp")
        .factory("UserService", UserService);


    function UserService($http) {


        var api = {
            "register"   : register,
            "findCurrentUser":findCurrentUser,
            "findRestaurantBySearchQuery" :findRestaurantBySearchQuery,
            "login" :login,
            "updateUser" :updateUser,
            "logout" : logout,
            "findReviewsForUser" :findReviewsForUser,
            "findUserById" : findUserById,
            "followUser" : followUser,
            "checkLogin" : checkLogin,
            "findAllFollowers" : findAllFollowers
        };
        return api;


        function findRestaurantBySearchQuery(query){
            var url = 'https://developers.zomato.com/api/v2.1/search?q='
                +query+'&apikey=cfc7b0033ff1fb172a71b6a82059592d';
            return $http.get(url);

        }

        function findAllFollowers(userId){
            var url = "/api/user/" + userId + "/followers";
            return $http.get(url);
        }

        function followUser(followerId,followingId){
            var url = "/api/user/follow";
            var followObj = {
                'followerId' : followerId,
                'followingId' : followingId
            };

            return $http.post(url,followObj);
        }
        function findReviewsForUser(userId){
            var url = "/api/review/user/" + userId;
            return $http.get(url);
        }

        function findCurrentUser(){
            return $http.get("/api/user1");
        }

        function register(user){
            return $http.post("/api/register",user);
        }

        function logout(){
            return $http.post("/api/logout");
        }

        function checkLogin(){
            return $http.post("/api/checkLogin");
        }

        function checkAdmin() {
            return $http.post("/api/checkAdmin");
        }

        function login(username,password){
            var user = {
                username : username,
                password : password
            };

            return $http.post("/api/login",user);
        }

        function createUser(user) {

            return $http.post('/api/user',user);

        }

        function findUserById(id) {
            var url = '/api/user/' +  id + '/profile';
            return $http.get(url);

        }

        function findUserByUsername(username){
            var url = '/api/user?username=' + username;
            return $http.get(url);
        }

        function findUserByCredentials(username,password){

            var url  = '/api/user?username=' + username + '&password=' + password;
            return $http.get(url);

        }

        function updateUser(user){
            var url = "/api/user1/" + user._id;
            return $http.put(url,user);

        }

        function deleteUser(userId){

            var url = "/api/user/" + userId;
            return $http.delete(url);


        }


    }

})();
