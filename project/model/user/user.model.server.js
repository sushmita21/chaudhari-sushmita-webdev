
	var model =null;
	var mongoose = require('mongoose');
	var UserSchema = require("./user.schema.server.js")();
	var UserModel1  =  mongoose.model("UserModel1",UserSchema);

	var api = {
		createUser : createUser,
		findUserById : findUserById,
		findUserByFacebookId :findUserByFacebookId,
        findUserByGoogleId :findUserByGoogleId,
		updateUser : updateUser,
		findUserByCredentials : findUserByCredentials,
		findUserByUsername : findUserByUsername,
		findWebsitesForUser : findWebsitesForUser,
		deleteUser :deleteUser,
		findReviewsByUser :findReviewsByUser,
		followUser : followUser,
		findAllFollowers :findAllFollowers,
		findAllRegisteredUsers : findAllRegisteredUsers,
		setModel :setModel
};
	return api;

	function setModel(_model){
		model = _model;
	}

	function followUser(followerId,followingId){
		return UserModel1.findById(followingId)
			.then(function(followingObj){
				return UserModel1.findById(followerId)
					.then(function(followerObj){
						followingObj.followers.push(followerObj);
						followerObj.following.push(followingObj);

						followerObj.save();
						return followingObj.save();
					},
					function(error){
					})
			},
			function(error){
			})
	}

	function findAllFollowers(userId){
		return UserModel1.findById(userId)
				.then(function(user){
					return user.followers;
				},
				function(error){
				})
	}

	function findAllRegisteredUsers(){
		return UserModel1.find({
			'role' : 'CUSTOMER'
		});
	}

	function createUser(user){
		return UserModel1.create(user);
	}

	function findUserById(userId){
		return UserModel1.findById(userId);
	}

	function findUserByFacebookId(facebookId){
		return UserModel1.findOne({
			"facebook.id" : facebookId
		});
	}

    function findUserByGoogleId(googleId){
        return UserModel1.findOne({
            "google.id" : googleId
        });
    }

	function findUserByUsername(username){
		return UserModel1.findOne({
			"username" : username
		});
	}

	function updateUser(userId,user){
		return UserModel1.update({
			_id: userId
		},
		{
			firstName : user.firstName,
			lastName : user.lastName,
			email :user.email,
			about : user.about,
			imageUrl : user.imageUrl
		});
	}

	function findUserByCredentials(username,password){
		return UserModel1.findOne({
			username : username,
			password : password
		});
	}

	function findReviewsByUser(userId){
		return UserModel1.findById(userId)
			.then(function(user){
				return user.reviews;
			});
	}

	function findWebsitesForUser(userId){
		return UserModel1.findById(userId)
						.then(function(user){
							return user.websites;
						});
	}

	function deleteUser(userId){
		return UserModel1.remove({
			_id :userId
		});




};