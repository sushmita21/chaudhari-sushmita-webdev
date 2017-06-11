/**
 * Created by ch_su_000 on 07/06/2017.
 */
var mongoose = require('mongoose');

var WebsiteSchema = mongoose.Schema(
    {
        _user:{type: mongoose.Schema.ObjectId,  ref: 'UserModel'},
        name: String,
        description: String,
        dateCreated:{type: Date, default: Date.now},
        pages:[{type: mongoose.Schema.Types.ObjectId, ref:'PageModel'}],
    },
    {collection:'assignment.websites'});
module.exports = WebsiteSchema;