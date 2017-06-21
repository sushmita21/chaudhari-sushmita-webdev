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
                .success(function(user){
                    if(user != '0'){
                        vm.user = user;

                    }
                })
                .error(function(){

                });

            var allUsersPromise = AdminService.findAllRegisteredUsers();
            var reviewsList = [];
            allUsersPromise
                .success(function(users){
                    if(users){
                        vm.users = users;
                        for(var u in users){
                            AdminService.findAllCustomerReviews(users[u]._id)
                                .success(function(reviews){
                                    for(var r in reviews){
                                        RestaurantService.findReviewById(reviews[r]._id)
                                            .success(function(review){
                                                reviewsList.push(review);
                                            })
                                            .error(function(){
                                            });
                                    }
                                })
                                .error(function(){
                                });
                        }
                        vm.reviews = reviewsList;
                    }
                })
                .error(function(){
                });

        }
        init();

        vm.deleteUser = deleteUser;

        function deleteUser(userId){

            var userDeletePromise = AdminService.deleteUser(userId);

            userDeletePromise
                .success(function(response){
                    console.log(response);
                    if(response == 'OK'){
                        $location.url("/admin/" + userId);
                    }
                    else{
                    }
                })
                .error(function(){

                });


        }

        vm.logout = logout;
        function logout(){
            UserService.logout()
                .success(function(){
                    $location.url("/login");
                });
        }

    }
})();