/**
 * Created by ch_su_000 on 07/06/2017.
 */
var mongoose = require('mongoose');

var websiteSchema = mongoose.Schema(
{
    _user:{type: mongoose.Schema.ObjectId,  ref: websiteModel},
    name: String,
    description: String,
    dateCreated:{type: Date, default: Date.now}
},
 {collection:'assignment.websites'});