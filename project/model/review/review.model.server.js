	var mongoose = require('mongoose');
	var ReviewSchema = require ("./review.schema.server");
	var ReviewModel = mongoose.model("ReviewModel", ReviewSchema);
	module.exports = ReviewModel;
	var userModel1 = require("../user/user.model.server");
	var restaurantModel = require("../restaurant/restaurant.model.server");


    ReviewModel.createUserReview = createUserReview;
    ReviewModel.deleteReview = deleteReview;
    ReviewModel.updateReview = updateReview;
    ReviewModel.findReviewsByRestaurant = findReviewsByRestaurant;
    ReviewModel.findReviewById = findReviewById;
    ReviewModel.findAllCustomerReviews = findAllCustomerReviews



	function createUserReview(userId,zomatoId,review){
		return ReviewModel.create(review)
			.then(function(reviewObject){
				return userModel1.findUserById(userId)
					.then(function(userObject){
						return restaurantModel.findRestaurantByZomatoId(zomatoId)
								.then(function(restaurantObj){
									userObject.reviews.push(reviewObject);
									userObject.save();
									restaurantObj.reviews.push(reviewObject);
									restaurantObj.save();
									reviewObject._user = userObject._id;
									reviewObject.createdBy = userObject.username;
									reviewObject.restaurant = restaurantObj.name;
									reviewObject._restaurant = restaurantObj._id;
									reviewObject.save();
									return reviewObject.save();

								},
								function(error){
								});
						
					},
					function(error){
					});
				
			},
			function(error){
			});
	}

	function findAllCustomerReviews(userRole){

		return userModel1.findUserById(userId)
			.then(function(user){
				return user.reviews;
			})
	}

	function findReviewsByRestaurant(restaurantName){

		return ReviewModel.find({
			'restaurant' : restaurantName
		});

	}

	function findReviewById(reviewId){
		return ReviewModel.findById(reviewId);
	}

    function updateReview(reviewId,reviewUpdate){
        return ReviewModel.update({
                _id: reviewId
            },
            {
                review : reviewUpdate.review
            });
    }


    function deleteReview(reviewId,restId,userId){
        return ReviewModel.remove({
            _id :reviewId
        })
            .then(function (response) {
            restaurantModel.findRestaurantById(restId)
                .then(function (restaurantObj) {
                	var revList = restaurantObj.reviews;
                	var ind = revList.indexOf(reviewId);
                	revList.slice(ind,1);
                        return model.restaurantModel.update({
                                _id: restId
                            },
                            {
                                reviews : revList
                            });

					},
                    function (error) {
                    });
        })

};