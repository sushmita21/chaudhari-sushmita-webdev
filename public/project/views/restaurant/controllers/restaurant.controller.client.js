/**
 * Created by Sushmita on 6/10/2017.
 */
(function() {
    angular
        .module("FoodApp")
        .controller("RestaurantController", RestaurantController);

    function RestaurantController($location,$routeParams,UserService,RestaurantService){
        var vm = this;
        var restaurantId = $routeParams.rid;
        var restZomatoId = $routeParams.rid;

        function init() {
            var restaurantName;

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
                                    }
                                    ,function(){

                                    });
                            }
                             ,function(){

                            });
                    }
                }
                ,function(){

                });



        }
        init();


    }

})();