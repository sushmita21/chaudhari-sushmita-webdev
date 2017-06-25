
	var mongoose = require('mongoose');
	var RestaurantSchema = require ("./restaurant.schema.server.js");
	var RestaurantModel = mongoose.model("RestaurantModel", RestaurantSchema);
    module.exports = RestaurantModel;

    RestaurantModel.findRestaurantById = findRestaurantById;
    RestaurantModel.createRestaurant = createRestaurant;
    RestaurantModel.findRestaurantByZomatoId = findRestaurantByZomatoId;
    RestaurantModel.findZomatoIdByRestaurantId =findZomatoIdByRestaurantId;
    RestaurantModel.findReviewsForRestaurant = findReviewsForRestaurant;
    RestaurantModel.findOffersForRestaurant = findOffersForRestaurant;
    RestaurantModel.createUserOffer = createUserOffer;
    RestaurantModel.deleteOffer = deleteOffer;
    RestaurantModel.rateRestaurant = rateRestaurant;


    function createUserOffer(userId,zomatoId,offer){

		return RestaurantModel.findRestaurantByZomatoId(zomatoId)
			.then(function(restaurantObj){

					console.log("rest found");
					console.log(offer.offer);
                    restaurantObj.offers.push(offer.offer);
					restaurantObj.save();
				},
				function(error){
				});
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

	function findReviewsForRestaurant(zomatoId) {
        return RestaurantModel.findOne({
            "zomatoId": zomatoId
        })
            .then(function (restaurant) {
                return restaurant.reviews;
            });
    }
	function findOffersForRestaurant(zomatoId) {
		return RestaurantModel.findOne({
			"zomatoId": zomatoId
		})
			.then(function (restaurant) {
				return restaurant.offers;
			});

	}

    function deleteOffer(restId,offer){

    	console.log("hereeeerrerr");
    	console.log(restId);
		return RestaurantModel.findRestaurantByZomatoId(restId)
			.then(function (restaurantObj) {

                    console.log(restaurantObj);
                    var offerList = restaurantObj.offers;
                    console.log(offerList);
                    var ind = offerList.indexOf(offer);
                    console.log(ind);
                    offerList.splice(ind,1);
                    console.log(offerList);
                    return RestaurantModel.update({
                            zomatoId: restId
                        },
                        {
                            offers : offerList
                        })
                        .then(function (response) {
                            console.log("response");
                            console.log(response);
                            return response;
                        })
				},
				function (error) {
				});

    }


    function rateRestaurant(restId,stars){

    	console.log(restId);
        return RestaurantModel.findRestaurantByZomatoId(restId)
            .then(function (restaurantObj) {
                    console.log("printing");
                    console.log(stars);
                    console.log(restaurantObj);
                    var oldRating = restaurantObj.rating;
                    var newRating = ((oldRating + stars)/2) .toFixed(2);
                    console.log(oldRating);
                    console.log(newRating);
                    return RestaurantModel.update({
                            zomatoId: restId
                        },
                        {
                            rating : newRating
                        })
                        .then(function (response) {
                            return response;
                        })
                },
                function (error) {
                });

    }
