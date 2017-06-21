module.exports = function(app,model){
	app.get("/api/admin/users",findAllRegisteredUsers);
	app.get("/api/:userId/reviews",findAllCustomerReviews);
	app.delete("/api/user/:userId/delete",deleteUser);

	function findAllRegisteredUsers(req,res){
		model.userModel1.findAllRegisteredUsers()
			.then(function(users){
				res.json(users);
			},
			function(error){
				res.sendStatus(400).send(error);
			});
	}

	function findAllCustomerReviews(req,res){

		var userId = req.params.userId;
		model.reviewModel.findAllCustomerReviews(userId)
			.then(function(reviews){
				res.json(reviews);
			},
			function(error){
				res.sendStatus(400).send(error);
			});
	}

	function deleteUser(req,res){

		var userId = req.params.userId;
		model.userModel1.deleteUser(userId)
			.then(function(status){

				res.send("OK");
			},
			function(error){
				res.sendStatus(400).send(error);
			});
	}

};