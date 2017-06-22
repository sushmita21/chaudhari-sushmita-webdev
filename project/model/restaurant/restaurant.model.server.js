
	var mongoose = require('mongoose');
	var RestaurantSchema = require ("./restaurant.schema.server.js");
	var RestaurantModel = mongoose.model("RestaurantModel", RestaurantSchema);
    module.exports = RestaurantModel;

    RestaurantModel.findRestaurantById = findRestaurantById;
    RestaurantModel.createRestaurant = createRestaurant;
    RestaurantModel.findRestaurantByZomatoId = findRestaurantByZomatoId;
    RestaurantModel.findZomatoIdByRestaurantId =findZomatoIdByRestaurantId;
    RestaurantModel.findReviewsForRestaurant = findReviewsForRestaurant;


	function findRestaurantById(restaurantId){
		return RestaurantModel.findById(restaurantId);
	}

	function createRestaurant(restaurant){
		return RestaurantModel.create(restaurant);

	}

	function findRestaurantByZomatoId(zomatoId){
		return RestaurantModel.findOne({
			"zomatoId" : zomatoId
		});
	}

    function findZomatoIdByRestaurantId(restaurantId){
        return RestaurantModel.findOne({
            "_id" : restaurantId
        });
    }

	function findReviewsForRestaurant(zomatoId){
		return RestaurantModel.findOne({
			"zomatoId" : zomatoId
		})
		.then(function(restaurant){
			return restaurant.reviews;
		});


};