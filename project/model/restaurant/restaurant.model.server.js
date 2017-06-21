module.exports = function(){
	var model ={};
	var mongoose = require('mongoose');
	var RestaurantSchema = require ("./restaurant.schema.server.js")();
	var RestaurantModel = mongoose.model("RestaurantModel", RestaurantSchema);

	var api={
		setModel :setModel,
		findRestaurantById : findRestaurantById,
		createRestaurant :createRestaurant,
		findRestaurantByZomatoId : findRestaurantByZomatoId,
        findZomatoIdByRestaurantId :findZomatoIdByRestaurantId,
		findReviewsForRestaurant : findReviewsForRestaurant
	};
	return api;

	function setModel(_model){
		model = _model;
	}

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
	}

};