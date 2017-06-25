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
        vm.rateRestaurant = rateRestaurant;
        vm.rateRestaurant1 = rateRestaurant1;
        vm.createOffer = createOfferByUser;
        vm.updateReview = updateReview;
        vm.deleteOffer = deleteOffer;
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
                            .then(function(review){
                                reviewList.push(review);
                                $scope.loadedData = false;
                            },function (err) {
                                
                            })
                    }
                    vm.reviewList = reviewList;

                },function(){
                });


            var offerList = [];

            RestaurantService.findAllOffers(restZomatoId)
                .then(function(offers){
                    console.log(offers);
                    for(var o in offers){
                            offerList.push(offers[o]);
                            $scope.loadedData = false;
                        }
                    vm.offerList = offerList;

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


        function createOfferByUser(userId,restaurantId,offer){

            if(!userId){
                vm.alert = "Please Login to Review";
            }
            else{

                RestaurantService.createUserOffer(userId,restaurantId,offer)
                    .then(function(response){

                        $location.url("/restaurant/" + restaurantId+ "/offers");
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


        function rateRestaurant(stars,userId,restaurantId){


            if(!userId){
                vm.info = "Please Login to Rate";
            }
            else {
                RestaurantService.rateRestaurant(restaurantId, stars)
                    .then(function (response) {
                        RestaurantService.findRestaurantDetails(restaurantId)
                            .then(function (restaurant) {
                                vm.restaurant = restaurant;
                            });
                        $location.url("/restaurant/" + restaurantId);
                    }, function (err) {

                    })
            }

        }


        function rateRestaurant1(stars,userId,restaurantId){

            console.log("hereewwewe");
            if(!userId){
                vm.info = "Please Login to Rate";
            }
            else {
                RestaurantService.rateRestaurant(restaurantId, stars)
                    .then(function (response) {
                        RestaurantService.findRestaurantDetails(restaurantId)
                            .then(function (restaurant) {
                                vm.restaurant = restaurant;
                            });
                        console.log($routeParams.revid);
                        $location.url("/restaurant/" + restaurantId+ '/' + $routeParams.revid+ "/update");

                    }, function (err) {

                    })
            }

        }


        function deleteOffer(restaurantId, offer){

            console.log(restaurantId);
            console.log(offer);
            RestaurantService.deleteOffer(restaurantId ,offer)
                .then(function(response){
                    console.log("deleted");
                    var offerList = [];
                    RestaurantService.findAllOffers(restaurantId)
                        .then(function(offers){
                            for(var o in offers){
                                offerList.push(offers[o]);
                                $scope.loadedData = false;
                            }
                            vm.offerList = offerList;

                        },function(){
                        });
                    $location.url("/restaurant/" + restaurantId+ "/offers");
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