module.exports = function (app) {
    var UserModel = require('./model/user/user.model.server');
    var WebsiteModel = require('./model/website/website.model.server')
    var PageModel = require('./model/page/page.model.server')
    var WidgetModel = require('./model/widget/widget.model.server')

    var models = require("./model/models.server");
    // UserModel
    //     .findUserByUsername("tejagumma")
    //     .then(function (user) {
    //         console.log(user)
    //     }, function (err) {
    //         console.log(err)
    //     })
    var model = {
        UserModel: UserModel,
        WebsiteModel: WebsiteModel,
        PageModel: PageModel,
        WidgetModel: WidgetModel
    };


    PageModel
        .setmodel(model)
    WebsiteModel
        .setmodel(model)

    require("./services/website.services.server.js")(app,WebsiteModel,UserModel,PageModel);
    require("./services/widget.service.server.js")(app,WidgetModel,PageModel);
    require("./services/page.service.server.js")(app,PageModel,WebsiteModel,WidgetModel);
    require("./services/user.service.server.js")(app,UserModel,WebsiteModel);

};