var app = require('../../express');
var restaurantModel = require('../model/restaurant/restaurant.model.server');

app.post('/api/restaurant', createRestaurant);
app.get('/api/restaurant/:restId',findRestaurantDetails);



	function createRestaurant(req,res){
		var restaurant = req.body;
		var zomatoId = restaurant.zomatoId;

		restaurantModel.findRestaurantByZomatoId(zomatoId)
			.then(function(restaurantObj){
				if(restaurantObj){
					res.send('OK');
				}
				else{
					return restaurantModel.createRestaurant(restaurant);
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

		restaurantModel.findRestaurantByZomatoId(restaurantId)
			.then(function(restaurantObj){
				res.json(restaurantObj);
			},
			function(error){
				res.sendStatus(400).send(error);
			});
	}
