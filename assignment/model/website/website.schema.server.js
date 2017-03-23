
var mongoose=require('mongoose')

var websiteSchema = mongoose.Schema({
    _user : {type: mongoose.Schema.Types.ObjectId, ref:'UserModule'},
    name:String,
    description: String,
    pages : [{type: mongoose.Schema.Types.ObjectId, ref:'PageModule'}],
    dateCreated: {type: Date, default:Date.now()}
},{collection: "website"});

module.exports = websiteSchema;
