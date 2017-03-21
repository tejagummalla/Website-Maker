
var mongoose=require('mongoose')

var websiteSchema = mongoose.Schema({
    _user : {type: mongoose.Schema.Types.ObjectId, ref:'UserModule'},
    name:String,
    description: String,
    pages : [{type: mongoose.Schema.Types.ObjectId, ref:'PageModule'}],
    dateCreated: Date
},{collection: "website"});

module.exports = websiteSchema;
