/**
 * Created by ch_su_000 on 07/06/2017.
 */
var mongoose = require("mongoose");
var PageSchema = mongoose.Schema({
    _website: {type:mongoose.Schema.Types.ObjectId, ref:'WebsiteModel'},
    name: String,
    title: String,
    description: String,
    widgets: [{type: mongoose.Schema.Types.ObjectId, ref:'PageModel'}],
    dateCreated: {type:Date, default: Date.now()}
}, {collection: "assignment.users"});
module.exports = PageSchema;
