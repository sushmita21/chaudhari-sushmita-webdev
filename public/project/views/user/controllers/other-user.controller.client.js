/**
 * Created by ch_su_00 on 4/13/2017.
 */
(function() {
    angular
        .module("RestaurantReviewApp")
        .controller("OtherUserController", OtherUserController);

    function OtherUserController($location,$routeParams,UserService,RestaurantService){
        var vm = this;
        var userId = $routeParams.uid;
        vm.logout = logout;
        function init() {
            var restaurantName;
            var promise = UserService.findCurrentUser();
            promise
                .then(function(user){
                    if(user != '0'){
                        vm.user = user;

                    }
                },function(){

                });

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
                },function(){

                });

            var reviewListPromise = UserService.findReviewsForUser(userId);
            var reviewList = [];
            reviewListPromise
                .then(function(reviews){
                    for(var r in reviews){
                        RestaurantService.findReviewById(reviews[r])
                            .then(function(review){
                                reviewList.push(review);
                            },function(){

                            });
                    }

                    vm.reviewList = reviewList;
                },function(){
                });

            var followersList =[];

            var followersPromise = UserService.findAllFollowers(userId);

            followersPromise
                .then(function(followers){
                    for (var f in followers){
                        UserService.findUserById(followers[f])
                            .then(function(follower){
                                followersList.push(follower);
                            },function(){

                            });
                    }
                    vm.followers = followersList;

                    for(var f in followersList){
                        if(followersList[f]._id == vm.user._id){
                            vm.otherUser.followed = "TRUE";
                            break;
                        }
                    }

                },function(){

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
                                    },function(){

                                    });
                            }
                            vm.followers = followersList;

                            for(var f in followersList){
                                if(followersList[f]._id == vm.user._id){
                                    vm.otherUser.followed = "TRUE";
                                    break;
                                }
                            }

                        },function(){

                        });
                    $location.url("/user/" + followingId + "/profile");

                },function(){

                    vm.alert = "Please login to follow user";

                });
        }

        function logout(){
            UserService.logout()
                .then(function(){
                    $location.url("/login");
                });
        }
    }

})();