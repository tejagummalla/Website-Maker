module.exports = function () {

    //var WebsiteModel = require('./website/website.model.server.js')();
    var model = {
        UserModel: UserModel
    }
    var UserModel = require('./user/user.model.server.js')();
    return model
}
