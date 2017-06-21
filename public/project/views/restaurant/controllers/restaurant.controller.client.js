/**
 * Created by ch_sus_00 on 4/10/2017.
 */
(function() {
    angular
        .module("RestaurantReviewApp")
        .controller("RestaurantController", RestaurantController);

    function RestaurantController($location,$routeParams,UserService,RestaurantService,$scope,$timeout){
        var vm = this;
        var restaurantId = $routeParams.rid;
        console.log("riddd");
        console.log(restaurantId);
        vm.createReview = createReviewByUser;
        vm.updateReview = updateReview;
        var restZomatoId = $routeParams.rid;
        var reviewId = $routeParams.revid;
        vm.logout = logout;

        function init() {
            var restaurantName;
            UserService.findCurrentUser()
                .then(function(user){
                    if(user != '0'){
                        vm.user = user;
                    }
                },function(){

                });

            RestaurantService.findReviewById(reviewId)
                .then(function (reviewObj) {
                    vm.reviewUpdate = reviewObj;
                    $scope.currentreview = reviewObj.review;
                },function () {

                })
            RestaurantService.findRestaurantDetails(restaurantId)
                .then(function(restaurant){
                    if(restaurant){
                        vm.restaurant = restaurant;
                    }
                    else{
                        RestaurantService.findRestaurantDetailsById(restaurantId)
                            .then(function(restaurant){
                                console.log(restaurant.aggregate_rating);
                                var restaurantObj = {
                                    'name' : restaurant.name,
                                    'cuisine' :restaurant.cuisines,
                                    'locality' : restaurant.location.locality,
                                    'zomatoId' : restaurant.id,
                                    'address' : restaurant.location.address,
                                    'cost' : restaurant.average_cost_for_two,
                                    'rating' :restaurant.user_rating.aggregate_rating,
                                    'imageUrl' : restaurant.thumb

                                };
                                vm.restaurant = restaurantObj;
                                restaurantName = restaurant.name;
                                RestaurantService.createRestaurant(restaurant)
                                    .then(function(response){
                                        if(response != 'OK'){
                                        }
                                        else{
                                        }
                                    },function(){

                                    });
                            },function(){

                            });
                    }
                },function(){

                });


            var reviewList = [];

            RestaurantService.findAllReviews(restZomatoId)
                .then(function(reviews){
                    for(var r in reviews){
                        RestaurantService.findReviewById(reviews[r])
                            .success(function(review){
                                reviewList.push(review);
                                $scope.loadedData = false;
                            })
                            .error(function(){
                            });
                    }
                    vm.reviewList = reviewList;

                },function(){
                });


        }
        init();


        function createReviewByUser(userId,restaurantId,review){

            if(!userId){
                vm.alert = "Please Login to Review";
            }
            else{

                RestaurantService.createUserReview(userId,restaurantId,review)
                    .then(function(response){

                        $location.url("/restaurant/" + restaurantId+ "/reviews");
                    },function(){

                    });
            }

        }

        function updateReview(reviewUpd){

            var revId = vm.reviewUpdate._id;
            console.log("Update Review");
            vm.reviewUpdate.review = reviewUpd;
            console.log(vm.reviewUpdate);
            console.log(reviewUpd);

            RestaurantService.updateReview(revId , vm.reviewUpdate)
                .then(function(response){

                    $location.url("/restaurant/" + restaurantId+ "/reviews");
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