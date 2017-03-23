
    //var WebsiteModel = require('./website/website.model.server.js')();
    var model = {
        UserModel: UserModel,
        WebsiteModel: WebsiteModel,
        WidgetModel: WidgetModel,
        PageModel: PageModel
    }
    var UserModel = require('./user/user.model.server.js');
    var PageModel = require('./page/page.model.server');
    var WebsiteModel = require('./website/website.model.server');
    var WidgetModel = require('./widget/widget.model.server');

    module.exports = model;
