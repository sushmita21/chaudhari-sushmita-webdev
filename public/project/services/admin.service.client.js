/**
 * Created by Himanshu on 4/13/2017.
 */
(function() {
    angular
        .module("FoodApp")
        .factory("AdminService", AdminService);

    function AdminService($http){

        var api = {
            "findAllRegisteredUsers" : findAllRegisteredUsers,
            "findAllCustomerReviews" : findAllCustomerReviews,
            "deleteUser" : deleteUser
        };

        return api;

        function findAllRegisteredUsers(){
            var url = "/api/admin/users";
            return $http.get(url);
        }

        function findAllCustomerReviews(userId){
            var url = "/api/"+userId+"/reviews";
            return $http.get(url);
        }


        function deleteUser(userId){
            var url = "/api/user/" + userId + "/delete";
            return $http.delete(url);
        }

    }
})();