module.exports = function (app) {

    app.get("/api/website/:websiteId/page", findPageByWebsiteId);
    app.get("/api/page/:pageId", findPageById);
    app.delete("/api/page/:pageId", deletePage)
    app.post("/api/website/:websiteId/page/new", createPage);
    app.put("/api/page/:pageId", updatePage)


    var pages=[
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    ];

    function findPageByWebsiteId(req,res) {
        var pg=[];
        websiteId=req.params.websiteId;
        for (p in pages){
            if (pages[p].websiteId==websiteId){
                pg.push(pages[p])
            }
        }
        res.send(pg);
    }
    function updatePage(req,res) {
        pageId=req.params.pageId;
        page= req.body;

        for(var p in pages){
            if (pages[p]._id==page._id){
                pages[p].name=page.name;
                pages[p].description=page.description;
                res.sendStatus(200);
                return;
            }
        }
    }

    function deletePage(req,res) {
        pageId=req.params.pageId;

        for(var p in pages){
            if (pages[p]._id==pageId){
                pages.splice(p,1);
                res.sendStatus(200);
                return;
            }
        }
    }
    function createPage(req,res) {
        websiteId=req.params.websiteId;
        page=req.body;
        var id= (new Date()).getTime();
        page._id=id;
        page.websiteId=websiteId;
        pages.push(page);
        res.sendStatus(200);
    }

    function findPageById(req,res) {
        var pageId= req.params.pageId;
        var page=pages.find(function (page) {
            return pageId==page._id;
        });
        res.json(page);
    }
}
