module.exports = function (app,WebsiteModel,UserModel,PageModel) {

    app.get("/api/user/:userId/website", findWebsiteByUserId);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.delete("/api/user/:userId/website/:websiteId", deleteWebsite);
    app.put("/api/website/:websiteId", updateWebsite);
    app.post("/api/user/:userId/website/new", createWebsite);

    // var websites=[
    //     { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
    //     { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
    //     { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
    //     { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
    //     { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
    //     { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
    // ];


    function createWebsite(req,res) {
        var website=req.body;
        var userId=req.params.userId;
        website._user = userId
        var id;
        WebsiteModel
            .createWebsite(website)
            .then(function (website) {
                id=website._id
                UserModel
                    .addWebsite(userId,id)
                    .then(function (user) {
                        res.sendStatus(200)
                    }, function (err) {
                        res.send(err)
                    })
                res.json(website)
            }, function (err) {
                res.send(err);
            })


    }

    function updateWebsite(req,res) {
        var websiteId=req.params.websiteId;
        var website= req.body;

        WebsiteModel
            .updateWebsite(websiteId,website)
            .then(function (website) {
                res.sendStatus(200)
            },
            function (err) {
                res.send(err)
            })
    }
    function deleteWebsite(req,res) {
        var websiteId=req.params.websiteId;
        var userId = req.params.userId;
        WebsiteModel
            .deleteWebsite(websiteId)
            .then(
                function (status) {
                    console.log(userId)
                    UserModel
                        .findUserById(userId)
                        .then(function (user) {
                            i = user.websites.indexOf(websiteId)
                            user.websites.splice(i,1)
                            UserModel
                                .updateUser(userId,user)
                                .then(function (user) {
                                    PageModel
                                        .deleteAllPages(websiteId)
                                        .then(function (page) {
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

    function findWebsiteByUserId(req,res) {
        var userId=req.params.userId;
        WebsiteModel
            .findWebsiteByUserId(userId)
            .then(function (websites) {
                res.json(websites)
            },function (err) {
                res.send(err)
            })
    }

    function findWebsiteById(req,res) {
        var websiteId=req.params.websiteId;
        WebsiteModel
            .findWebsiteById(websiteId)
            .then(function (website) {
                res.json(website)
            }, function (err) {
                res.send(err)
            })
    }

}