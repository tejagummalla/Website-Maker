module.exports = function (app) {

    app.get("/api/user/:userId/website", findWebsiteByUserId);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.delete("/api/website/:websiteId", deleteWebsite);
    app.put("/api/website/:websiteId", updateWebsite);
    app.post("/api/user/:userId/website/new", createWebsite);

    var websites=[
        { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
        { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
        { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
    ];


    function createWebsite(req,res) {
        var website=req.body;
        var userId=req.params.userId;

        var id=(new Date()).getTime();
        website._id=id;
        website.developerId=userId.toString();
        websites.push(website);
        res.sendStatus(200);
    }

    function updateWebsite(req,res) {
        var websiteId=req.params.websiteId;
        var website= req.body;

        for (var w in websites){
            if(websites[w]._id==websiteId){
                websites[w].name=website.name
                websites[w].description=website.description

                res.sendStatus(200);
                return;
            }
        }
    }
    function deleteWebsite(req,res) {
        var websiteId=req.params.websiteId;

        for (var w in websites){
            if (websites[w]._id== websiteId){
                websites.splice(w,1);
                res.sendStatus(200);
                return websiteId;
            }
        }
        res.sendStatus(404);
    }

    function findWebsiteByUserId(req,res) {
        var userId=req.params.userId;

        var site=[];
        for (var w in websites){
            if (websites[w].developerId===userId){

                site.push(websites[w]);
            }
        }
        res.send(site)
    }

    function findWebsiteById(req,res) {
        var websiteId=req.params.websiteId;
        var website= websites.find(function (web) {
            return websiteId==web._id;
        })
        res.json(website);
    }

}