/**
 * Created by ch_su_000 on 07/06/2017.
 */
(function () {
    angular
        .module('pocApp' ,[])
        .controller('pocController' ,pocController);

    function pocController($http) {
        var model = this;
        model.searchRestaurants = searchRestaurants;

        function searchRestaurants(query) {


            var url = 'https://developers.zomato.com/api/v2.1/search?q='
                +query+'&apikey=ef439d221e25788bf9c3e41c3ff7a43b';

            $http.get(url)
                .then(function (response) {
                    model.restaurants = response.data.restaurants;
                })
        }

    }
})();