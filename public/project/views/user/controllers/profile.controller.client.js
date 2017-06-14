/**
 * Created by Sushmita on 6/13/2017.
 */

(function (){

    angular
        .module("FoodApp")
        .controller("ProfileController" ,ProfileController);

    function ProfileController($routeParams,$location,UserService,RestaurantService) {
        var vm = this;
        var userId = $routeParams.uid;

        function init() {

            var followersList =[];

            var followersPromise = UserService.findAllFollowers(userId);

            followersPromise
                .then(function(followers){
                    for (var f in followers){
                        UserService.findUserById(followers[f])
                            .success(function(follower){
                                followersList.push(follower);
                            })
                            .error(function(){

                            });
                    }
                    vm.followers = followersList;

                },
                function(){

                });
        }
        init();

        vm.updateUser = updateUser;

        function updateUser(){
            var promise = UserService.updateUser(vm.user);
            promise
                .then(function(user){
                    if(user != '0'){
                        $location.url("profile/" + vm.user._id);
                    }
                },
                function(){
                });

        }

    }


})();

