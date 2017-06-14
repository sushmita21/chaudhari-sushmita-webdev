/**
 * Created by Sushmita on 6/13/2017.
 */
(function() {
    angular
        .module("FoodApp")
        .controller("OtherUserController", OtherUserController);

    function OtherUserController($location,$routeParams,UserService,RestaurantService){
        var vm = this;
        var userId = $routeParams.uid;
        function init() {
            var restaurantName;


            var userPromise = UserService.findUserById(userId);

            userPromise
                .then(function(user){
                    if(user != '0'){

                        vm.otherUser = user;
                        if(vm.user._id == vm.otherUser._id){
                            vm.otherUser.same="TRUE";

                        }else{
                            vm.otherUser.same="FALSE";
                        }

                    }
                    else{
                    }
                },
                function(){

                });

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

                    for(var f in followersList){
                        if(followersList[f]._id == vm.user._id){
                            vm.otherUser.followed = "TRUE";
                            break;
                        }
                    }

                }, function(){

                });

        }
        init();

        vm.followUser = followUser;

        function followUser(followerId,followingId){
            var followPromise = UserService.followUser(followerId,followingId);
            followPromise
                .then(function(followers){
                    var followersList =[];

                    var followersPromise = UserService.findAllFollowers(userId);

                    followersPromise
                        .then(function(followers){
                            for (var f in followers){
                                UserService.findUserById(followers[f])
                                    .then(function(follower){
                                        followersList.push(follower);
                                    },
                                    function(){

                                    });
                            }
                            vm.followers = followersList;

                            for(var f in followersList){
                                if(followersList[f]._id == vm.user._id){
                                    vm.otherUser.followed = "TRUE";
                                    break;
                                }
                            }

                        },
                        function(){

                        });
                    $location.url("/user/" + followingId + "/profile");

                },
                function(){

                    vm.alert = "Please login to follow user";

                });
        }

    }

})();