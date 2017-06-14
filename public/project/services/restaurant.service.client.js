/**
 * Created by Sushmita on 6/10/2017.
 */
(function() {
    angular
        .module("FoodApp")
        .factory("RestaurantService", RestaurantService);

    function RestaurantService($http){

        var api = {
            "findRestaurantDetailsById" : findRestaurantDetailsById,
            "createRestaurant" :createRestaurant,
            "findRestaurantDetails" : findRestaurantDetails
        };
        return api;

        function findRestaurantDetailsById(restaurantId){
            var url = 'https://developers.zomato.com/api/v2.1/restaurant?res_id='
                +restaurantId+'&apikey=cfc7b0033ff1fb172a71b6a82059592d';

            return $http.get(url)
                .then(function (response) {
                     return response.data;
                });
        }

        function findRestaurantDetails(restaurantId){
            var url = "/api/restaurant/" + restaurantId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }


        function createRestaurant(restaurant){
            var url = "/api/restaurant";
            var restaurantObj = {
                'name' : restaurant.name,
                'cuisine' :restaurant.cuisines,
                'locality' : restaurant.location.locality,
                'zomatoId' : restaurant.id,
                'address' : restaurant.location.address,
                'cost' : restaurant.average_cost_for_two,
                'rating' : restaurant.user_rating.aggregate_rating,
                'imageUrl' : restaurant.thumb
            };

            return $http.post(url,restaurantObj)
                .then(function (response) {
                    return response.data;
                });
        }


    }

})();