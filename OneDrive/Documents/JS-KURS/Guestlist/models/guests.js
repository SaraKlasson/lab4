// Schema for Rooms

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var swetime = new Date(Date.now() + 60 * 60 * 1000);



//Defining schema
var GuestsSchema = new Schema({
    status: { type: Boolean, default: 'false' },
    note: String,
    name: String,
    created: { type : Date, default: swetime } 
});

module.exports = mongoose.model("Guests", GuestsSchema);


