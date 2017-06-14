
	var mongoose = require('mongoose');
	var RestaurantSchema = require ("./restaurant.schema.server.js");
	var RestaurantModel = mongoose.model("RestaurantModel", RestaurantSchema);
    module.exports = RestaurantModel;

    RestaurantModel.findRestaurantById = findRestaurantById;
    RestaurantModel.createRestaurant = createRestaurant;
    RestaurantModel.findRestaurantByZomatoId = findRestaurantByZomatoId;



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


