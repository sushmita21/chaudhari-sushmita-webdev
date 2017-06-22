var app = require('../../express');
var userModel1 = require('../model/user/user.model.server');
var reviewModel = require('../model/review/review.model.server');

app.get("/api/admin/users",findAllRegisteredUsers);
app.get("/api/:userId/reviews",findAllCustomerReviews);
app.delete("/api/user/:userId/delete",deleteUser);

function findAllRegisteredUsers(req,res){
	userModel1.findAllRegisteredUsers()
		.then(function(users){
			res.json(users);
		},
		function(error){
			res.sendStatus(400).send(error);
		});
}

function findAllCustomerReviews(req,res){

	var userId = req.params.userId;
	reviewModel.findAllCustomerReviews(userId)
		.then(function(reviews){
			res.json(reviews);
		},
		function(error){
			res.sendStatus(400).send(error);
		});
}

function deleteUser(req,res){

	var userId = req.params.userId;
	userModel1.deleteUser(userId)
		.then(function(status){

			res.send("OK");
		},
		function(error){
			res.sendStatus(400).send(error);
		});


};