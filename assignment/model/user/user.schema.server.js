
var mongoose=require('mongoose')

var userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstname: String,
    lastname: String,
    email: String,
    phone: String,
    facebook:{id: String,
                token: String},
    google:{id:String,
            token:String},
    //websites: [website],
    websites: [{type: mongoose.Schema.Types.ObjectId, ref:'WebsiteModule'}],
    dateCreated: {type: Date, default:Date.now()}
},{collection: "user"});


module.exports = userSchema;