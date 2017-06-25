/**
 * Created by ch_su_00 on 6/13/2017.
 */
(function() {
    angular
        .module("RestaurantReviewApp")
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
            return $http.get(url)
                .then(function (response) {
                    return response.data;

                });
        }

        function findAllCustomerReviews(userId){
            var url = "/api/"+userId+"/reviews";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }


        function deleteUser(userId){
            var url = "/api/user/" + userId + "/delete";
            return $http.delete(url).then(function (response) {
                return response.data;
            });
        }

    }
})();