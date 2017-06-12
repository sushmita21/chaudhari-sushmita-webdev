/**
 * Created by ch_su_000 on 07/06/2017.
 */
var mongoose = require("mongoose");
var widgetSchema = mongoose.Schema({
    _page: {type: mongoose.Schema.Types.ObjectId, ref: 'PageModel'},
    type: {type:String, enum:['HEADER','IMAGE','YOUTUBE','HTML','TEXT']},
    name: String,
    text: String,
    placeholder: String,
    description: String,
    url: String,
    width: String,
    height: String,
    rows: String,
    size: String,
    class: String,
    icon: String,
    deletable: Boolean,
    formatted: Boolean,
    dateCreated: {type: Date, default: Date.now()}
}, {collection: "assignment.widgets"});
module.exports = widgetSchema;