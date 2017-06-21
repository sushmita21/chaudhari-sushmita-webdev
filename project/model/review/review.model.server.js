	var model ={};
	var mongoose = require('mongoose');
	var ReviewSchema = require ("./review.schema.server");
    var UserSchema = require ("../user/user.schema.server");
    var RestaurantSchema = require("../restaurant/restaurant.schema.server");
	var ReviewModel = mongoose.model("ReviewModel", ReviewSchema);
	var userModel1 = mongoose.model("UserModel", UserSchema);
	var restaurantModel = mongoose.model("RestaurantModel", RestaurantSchema);

	var api={
		setModel :setModel,
		createUserReview : createUserReview,
        deleteReview : deleteReview,
        updateReview : updateReview,
		findReviewsByRestaurant : findReviewsByRestaurant,
		findReviewById :findReviewById,
		findAllCustomerReviews : findAllCustomerReviews
	};
	return api;

	function setModel(_model){
		model = _model;
	}


	function createUserReview(userId,zomatoId,review){
		return ReviewModel.create(review)
			.then(function(reviewObject){
				return model.userModel1.findUserById(userId)
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