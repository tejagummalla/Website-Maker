module.exports = function (app,PageModel,WebsiteModel,WidgetModel) {

    app.get("/api/website/:websiteId/page", findPageByWebsiteId);
    app.get("/api/page/:pageId", findPageById);
    app.delete("/api/website/:websiteId/page/:pageId", deletePage)
    app.post("/api/website/:websiteId/page/new", createPage);
    app.put("/api/page/:pageId", updatePage)


    // var pages=[
    //     { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
    //     { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
    //     { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    // ];

    function findPageByWebsiteId(req,res) {
        websiteId=req.params.websiteId;
        PageModel
            .findPageByWebsiteId(websiteId)
            .then(function (page) {
                res.json(page)
            }, function (err) {
                res.send(err)
            })
    }
    function updatePage(req,res) {
        pageId=req.params.pageId;
        page= req.body;
        PageModel
            .updatePage(pageId,page)
            .then(function (page) {
                res.sendStatus(200)
            },function (err) {
                res.send(err)
            })
    }

    function deletePage(req,res) {
        pageId=req.params.pageId;
        websiteId=req.params.websiteId;

        PageModel
            .deletePage(pageId)
            .then(
                function (status) {
                    WebsiteModel
                        .findWebsiteById(websiteId)
                        .then(function (website) {
                            i = website.pages.indexOf(pageId)
                            website.pages.splice(i,1)
                            WebsiteModel
                                .updateWebsite(websiteId,website)
                                .then(function (website) {
                                    WidgetModel
                                        .deleteAllWidgets(pageId)
                                        .then(function (widget) {
                                            console.log('Hello')
                                            res.sendStatus(200)
                                        })
                                    res.sendStatus(200)
                                })

                            res.sendStatus(200);
                        })
                    res.sendStatus(200);
                },function (err) {
                    res.send(err)
                }
            )
    }
    function createPage(req,res) {
        websiteId=req.params.websiteId;
        page=req.body;
        page._website=websiteId
        PageModel
            .createPage(page)
            .then(function (page) {
                var id = page._id
                console.log(id)
                WebsiteModel
                    .addPage(websiteId,id)
                    .then(function (page) {
                        res.sendStatus(200)
                    })
                res.sendStatus(200)
            },function (err) {
                res.send(err);
            })
    }

    function findPageById(req,res) {
        var pageId= req.params.pageId;
        PageModel
            .findPageById(pageId)
            .then(function (page) {
                res.json(page)
            },function (err) {
                res.send(err)
            })
    }
}
