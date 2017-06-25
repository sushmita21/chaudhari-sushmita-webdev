/**
 * Created by ch_su_00 on 4/13/2017.
 */

(function (){

    angular
        .module("RestaurantReviewApp")
        .controller("ProfileController" ,ProfileController);

    function ProfileController($routeParams,$location,UserService,RestaurantService) {
        var vm = this;
        vm.logout = logout;
        var userId = $routeParams.uid;

        function init() {
            console.log("userId")
            console.log(userId);
            var promise = UserService.findCurrentUser();
            promise
                .then(function(user){
                    if(user != '0'){
                        vm.user = user;
                        console.log("current user found");
                    }
                },function(){

                });

            var reviewListPromise = UserService.findReviewsForUser(userId);
            var reviewList = [];
            reviewListPromise
                .then(function(reviews){
                    console.log(reviews);
                    for(var r in reviews){
                        RestaurantService.findReviewById(reviews[r])
                            .then(function(review){
                                reviewList.push(review);
                            },function (err) {
                                
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
                            },function (err) {
                                
                            });
                    }
                    vm.followers = followersList;

                },function(){

                });
        }
        init();

        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.updateReview = updateReview;
        vm.deleteReview = deleteReview;

        function updateUser(){
            var promise = UserService.updateUser(vm.user);
            promise
                .then(function(user){
                    if(user != '0'){
                        $location.url("profile/" + vm.user._id);
                    }
                }, function(){
                });

        }
        function updateReview(userId,reviewId,restaurantId){
            
            RestaurantService.findZomatoIdByRestaurantId(restaurantId)
                .then(function (restaurant) {
                    var zomatoId = restaurant.zomatoId;
                    $location.url("/restaurant/" + zomatoId + "/" + reviewId + "/update");
                },function () {

                });
        }

        function deleteUser(){
            var promise = UserService.deleteUser(vm.user._id);
            promise
                .then(function(response){
                    if(response == 'OK'){
                        $location.url("/login");
                    }
                },function(){
                });
        }


        function deleteReview(userId,reviewId,restaurantId){

            RestaurantService.deleteReview(userId,reviewId,restaurantId)
                .then(function(response){
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
                    $location.url("/profile/" + userId);
                },function(){
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

