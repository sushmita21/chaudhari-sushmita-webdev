/**
 * Created by Sushmita on 6/5/2017.
 */

(function (){

    angular
        .module("FoodApp")
        .controller("SearchController" ,SearchController);

    function SearchController($routeParams,$location,UserService){
        var vm = this;
        var query = $routeParams.query;
        vm.getRestaurantDetails = getRestaurantDetails;

        function init() {

            UserService.findRestaurantBySearchQuery(query)
                .then(function(response){
                    if(response != '0'){
                        vm.restaurants = response.restaurants;
                      }
                }
                ,function(){

                });
        }
        init();

        function getRestaurantDetails(restaurantId){

            $location.url("/restaurant/"+restaurantId);
        }

    }


})();

