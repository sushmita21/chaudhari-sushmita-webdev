/**
 * Created by ch_su_000 on 05/06/2017.
 */

var mongoose = require("mongoose");
var userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    websites: [{type: mongoose.Schema.Types.ObjectId, ref:'WebsiteModel'}],
    dateCreated: {type:Date, default: Date.now()},
    facebook: {id:String, token: String},
    google: {id:String, token: String}
}, {collection: "assignment.users"});
module.exports = userSchema;