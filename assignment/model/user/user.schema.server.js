
var mongoose=require('mongoose')

var userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstname: String,
    lastname: String,
    email: String,
    phone: String,
    //websites: [website],
    websites: [{type: mongoose.Schema.Types.ObjectId, ref:'WebsiteModule'}],
    dateCreated: Date
},{collection: "user"});


module.exports = userSchema;