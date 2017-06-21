/**
 * Created by ch_su_00 on 4/5/2017.
 */

(function (){

    angular
        .module("FoodApp")
        .controller("SearchController" ,SearchController);

    function SearchController($routeParams,$location,UserService){
        var vm = this;
        var query = $routeParams.query;
        vm.logout = logout;
        vm.checkSafeImageUrl = checkSafeImageUrl;
        vm.getRestaurantDetails = getRestaurantDetails;

        function init() {
            UserService.findCurrentUser()
                .then(function(user){
                    if(user != '0'){
                        vm.user = user;
                    }
                },function(){
                });

            UserService.findRestaurantBySearchQuery(query)
                .then(function(response){
                    if(response != '0'){
                        vm.restaurants = response.restaurants;
                      }
                },function(err){

                });
        }
        init();

        function checkSafeImageUrl(url){
            return $sce.trustAsResourceUrl(url);
        }

        function getRestaurantDetails(restaurantId){

            $location.url("/restaurant/"+restaurantId);
        }

        function logout(){
            UserService.logout()
                .then(function(){
                    $location.url("/login");
                }, function (err) {
                    
                });
        }

    }


})();

