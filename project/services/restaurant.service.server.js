module.exports = function(app,model){

	app.post('/api/:userId/:restId/review', createUserReview);
	app.post('/api/restaurant', createRestaurant);
	app.get('/api/:restId/reviews', findAllReviews);
	app.get('/api/review/:reviewId',findReviewById);
	app.get('/api/restaurant/:restId',findRestaurantDetails);
    app.get('/api/zomatoId/:restId',findZomatoIdByRestaurantId);
    app.put('/api/:reviewId/update',updateReview);
    app.delete('/api/:userId/:restId/:revId/review', deleteReview);


	function createUserReview(req,res){

		var review = req.body;
		var userId = req.params.userId;
		var restZomatoId = req.params.restId;

		model.reviewModel.createUserReview(userId,restZomatoId,review)
			.then(function(review){
				res.json(review);
				
			},
			function(error){
				res.sendStatus(400).send(error);
			});
	}

	function createRestaurant(req,res){
		var restaurant = req.body;
		var zomatoId = restaurant.zomatoId;

		model.restaurantModel.findRestaurantByZomatoId(zomatoId)
			.then(function(restaurantObj){
				if(restaurantObj){
					res.send('OK');
				}
				else{
					return model.restaurantModel.createRestaurant(restaurant);
				}
			},
			function(error){
				res.sendStatus(400).send(error);
			})
			.then(function(restaurant){
				res.json(restaurant);
			},
			function(error){
				res.sendStatus(400).send(error);
			});
	}

	function findRestaurantDetails(req,res){
		var restaurantId = req.params.restId;

		model.restaurantModel.findRestaurantByZomatoId(restaurantId)
			.then(function(restaurantObj){
				res.json(restaurantObj);
			},
			function(error){
				res.sendStatus(400).send(error);
			});
	}

	function findZomatoIdByRestaurantId(req,res){
        var restaurantId = req.params.restId;

        model.restaurantModel.findZomatoIdByRestaurantId(restaurantId)
            .then(function(restaurantObj){
                    res.json(restaurantObj);
                },
                function(error){
                    res.sendStatus(400).send(error);
                });
    }

	function findAllReviews(req,res){
		var zomatoId = req.params.restId;
		var reviewList = [];
		model.restaurantModel.findReviewsForRestaurant(zomatoId)
			.then(function(reviewObject){
				res.json(reviewObject);
			},
			function(error){
				res.sendStatus(400).send(error);
			});
	}

	function findReviewById(req,res){
		var reviewId = req.params.reviewId;

		model.reviewModel.findReviewById(reviewId)
			.then(function(review){
				res.json(review);
			},
			function(error){
				res.sendStatus(400).send(error);
			})
	}

    function updateReview(req,res){

        var reviewUpdate = req.body;
        var reviewId = req.params.reviewId;


        model.reviewModel.updateReview(reviewId,reviewUpdate)
            .then(function(status){
                    res.send('Update');
                },
                function(error){
                    res.sendStatus(400).send(error);
                });

    }

    function deleteReview(req,res){
        var reviewId = req.params.revId;
        var restId = req.params.restId;
        var userId = req.params.userId;
        model.reviewModel.deleteReview(reviewId)
            .then(function(status){
                    res.send(200);
                },
                function(error){
                    res.sendStatus(400).send(error);
                });
    }

};