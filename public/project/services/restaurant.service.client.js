/**
 * Created by ch_su_00 on 4/10/2017.
 */
(function() {
    angular
        .module("RestaurantReviewApp")
        .factory("RestaurantService", RestaurantService);

    function RestaurantService($http){

        var api = {
            "findRestaurantDetailsById" : findRestaurantDetailsById,
            "createUserReview" : createUserReview,
            "createRestaurant" :createRestaurant,
            "deleteReview" :deleteReview,
            "updateReview" :updateReview,
            "findAllReviews" :findAllReviews,
            "findReviewById" :findReviewById,
            "findZomatoIdByRestaurantId" :findZomatoIdByRestaurantId,
            "findRestaurantDetails" : findRestaurantDetails
        };
        return api;

        function findRestaurantDetailsById(restaurantId){
            var url = 'https://developers.zomato.com/api/v2.1/restaurant?res_id='
                +restaurantId+'&apikey=cfc7b0033ff1fb172a71b6a82059592d';

            return $http.get(url).then(function (response) {
                return response.data;
            });
        }

        function findRestaurantDetails(restaurantId){
            var url = "/api/restaurant/" + restaurantId;
            return $http.get(url).then(function (response) {
                return response.data;
            });
        }
        function createUserReview(userId,restaurantId,review){
            var url = '/api/'+userId+'/'+restaurantId+'/review';
            var userReview ={
                'review' : review,
            };

            return $http.post(url,userReview)
                .then(function (response) {
                return response.data;
            });
        }

        function findZomatoIdByRestaurantId(restaurantId){
            var url = "/api/zomatoId/" + restaurantId;
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

        function findAllReviews(restaurantId){
            var url ="/api/"+restaurantId+"/reviews";

            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findReviewById(reviewId){
            var url = "/api/review/" + reviewId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateReview(reviewId,reviewUpdate){
            var url = '/api/'+ reviewId +'/update';
            return $http.put(url,reviewUpdate)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteReview(userId,reviewId,restaurantId){
            console.log(reviewId);
            var url = '/api/'+userId+'/'+restaurantId+ '/'+reviewId +'/review';
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

    }

})();