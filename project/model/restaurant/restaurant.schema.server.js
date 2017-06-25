

	var mongoose = require('mongoose');

	var RestaurantSchema = mongoose.Schema({
		name : {type:String},
		cuisine : {type:String},
		zomatoId :{type : String},
		locality : {type:String},
		reviews : [{type : mongoose.Schema.Types.ObjectId, ref:'ReviewModel'}], 
		dateCreated : {type : Date, default: Date.now()},
		address : {type:String},
		cost : {type:String},
		offers : {type:[String]},
		rating :{type:Number},
		imageUrl : {type:String}

	},{collection : 'restaurant'});

module.exports = RestaurantSchema;