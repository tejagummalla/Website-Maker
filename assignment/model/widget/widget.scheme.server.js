
    var mongoose = require('mongoose')
    var WidgetSchema = mongoose.Schema({
        _page : {type : mongoose.Schema.Types.ObjectId, ref : "PageModel"},
        type : {type : String, enum: ['HTML','YOUTUBE','HEADING','IMAGE','INPUT']},
        name: String,
        text: String,
        placeholder: String,
        description : String,
        url : String,
        width : String,
        height :String,
        rows : Number,
        size : Number,
        class : String,
        icon : String,
        order : Number,
        deletable : Boolean,
        formatted : Boolean,
        dateCreated : {type: Date, default:Date.now()}
    },{collection : 'widget'});

    module.exports = WidgetSchema;