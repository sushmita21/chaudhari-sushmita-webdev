
var mongoose = require('mongoose');

var RestaurantSchema = mongoose.Schema({
	name : {type:String},
	cuisine : {type:String},
	zomatoId :{type : String},
	locality : {type:String},
	dateCreated : {type : Date, default: Date.now()},
	address : {type:String},
	cost : {type:String},
	rating :{type:Number},
	imageUrl : {type:String}

},{collection : 'restaurant'});


module.exports = RestaurantSchema;