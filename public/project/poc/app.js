(function () {
    angular
        .module('pocApp' ,[])
        .controller('pocController' ,pocController);

    function pocController($http) {
        var model = this;
        model.searchRestaurants = searchRestaurants;
        model.searchDetails = searchDetails;
        
        function searchRestaurants(query) {


            var url = 'https://developers.zomato.com/api/v2.1/search?q='
                +query+'&apikey=ef439d221e25788bf9c3e41c3ff7a43b';

            $http.get(url)
                .then(function (response) {
                    model.restaurants = response.data.restaurants;
                })
        }


        function searchDetails(restaurantId) {

            console.log("sdfdsfs");
            var url = 'https://developers.zomato.com/api/v2.1/restaurant?res_id='
                +restaurantId+'&apikey=ef439d221e25788bf9c3e41c3ff7a43b';


            $http.get(url)
                .then(function (response) {
                    console.log(response);
                    model.restaurant = response.data;
                })
        }
        
    }
})();