module.exports = function (app) {
    require("./services/website.services.server.js")(app);
    require("./services/widget.service.server.js")(app);
    require("./services/page.service.server.js")(app);
    require("./services/user.service.server.js")(app);

};