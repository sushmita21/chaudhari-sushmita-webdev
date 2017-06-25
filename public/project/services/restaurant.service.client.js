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
            "createUserOffer" : createUserOffer,
            "createRestaurant" :createRestaurant,
            "deleteReview" :deleteReview,
            "deleteOffer" :deleteOffer,
            "rateRestaurant" :rateRestaurant,
            "updateReview" :updateReview,
            "findAllReviews" :findAllReviews,
            "findAllOffers" :findAllOffers,
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


        function rateRestaurant(restaurantId,stars){
            console.log("printing stars");
            console.log(stars);
            var dummy = {"name" : "xyz"};
            var url = '/api/'+ restaurantId +'/rate?rate='+stars;
            return $http.put(url,dummy)
                .then(function (response) {
                    return response.data;
                });
        }

        function createUserOffer(userId,restaurantId,offer){
            console.log("in client offer");
            var url = '/api/'+userId+'/'+restaurantId+'/offer';
            var userOffer ={
                'offer' : offer,
            };

            return $http.post(url,userOffer)
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


        function findAllOffers(restaurantId){
            var url ="/api/"+restaurantId+"/offers";

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

        function deleteOffer(restaurantId,offer){
            var url = '/api/'+restaurantId+'/offer/'+offer;
            return $http.delete(url)
                .then(function (response) {
                    console.log("deleted successfully")
                    return response.data;
                });
        }

    }

})();