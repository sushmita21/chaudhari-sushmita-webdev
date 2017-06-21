/**
 * Created by ch_su_00 on 6/13/2017.
 */
(function() {
    angular
        .module("RestaurantReviewApp")
        .controller("AdminController", AdminController);

    function AdminController($location,$routeParams,AdminService,UserService,RestaurantService){
        var vm = this;

        function init(){
            var promise = UserService.findCurrentUser();
            promise
                .then(function(user){
                    if(user != '0'){
                        vm.user = user;

                    }
                },function(){

                });

            var allUsersPromise = AdminService.findAllRegisteredUsers();
            var reviewsList = [];
            allUsersPromise
                .then(function(users){
                    if(users){
                        vm.users = users;
                        for(var u in users){
                            AdminService.findAllCustomerReviews(users[u]._id)
                                .then(function(reviews){
                                    for(var r in reviews){
                                        RestaurantService.findReviewById(reviews[r]._id)
                                            .then(function(review){
                                                reviewsList.push(review);
                                            },function(){
                                            });
                                    }
                                },function(){
                                });
                        }
                        vm.reviews = reviewsList;
                    }
                },function(){
                });

        }
        init();

        vm.deleteUser = deleteUser;

        function deleteUser(userId){

            var userDeletePromise = AdminService.deleteUser(userId);

            userDeletePromise
                .then(function(response){
                    console.log(response);
                    if(response == 'OK'){
                        $location.url("/admin/" + userId);
                    }
                    else{
                    }
                },function(){

                });


        }

        vm.logout = logout;
        function logout(){
            UserService.logout()
                .then(function(){
                    $location.url("/login");
                });
        }

    }
})();