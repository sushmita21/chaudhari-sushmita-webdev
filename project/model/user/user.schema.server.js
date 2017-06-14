
var mongoose = require('mongoose');


var UserSchema = mongoose.Schema({
	fullName : String,
	username : String,
	password : String,
	imageUrl : String,
	about : String,
	email : String,
	phone :String,
	query:String,
	role:{type:String, default:'CUSTOMER',enum: ['CUSTOMER']},
	followers : [{type : mongoose.Schema.Types.ObjectId, ref:'UserModel1'}],
	following : [{type : mongoose.Schema.Types.ObjectId, ref:'UserModel1'}],
	dateCreated : {type : Date, default: Date.now()}
}, {collection : 'user'});

module.exports = UserSchema;

