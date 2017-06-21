

	var mongoose = require('mongoose');

	var ReviewSchema = mongoose.Schema({
		review : {type:String},
		_user : {type : mongoose.Schema.Types.ObjectId, ref : 'UserModel1'},
		dateCreated : {type : Date, default: Date.now()},
		createdBy: {type:String},
		restaurant : {type:String},
		_restaurant : {type : mongoose.Schema.Types.ObjectId, ref : 'RestaurantModel'},
		role:{type:String, default:'CUSTOMER',enum: ['ADMIN','CUSTOMER']}

	},{collection : 'review'});

	module.exports =  ReviewSchema;

