module.exports = function (app) {

    app.get("/api/user/:userId/website/:websiteId/page/:pageId/widget", findAllWidgets);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.post("/api/page/:pageId/widget", createWidget);

    var multer = require('multer'); // npm install multer --save
    var storage=multer.diskStorage({
        destination: function (req,file,cb) {
            cb(null,__dirname+"/../../public/uploads")
        },
        filename: function (req, file, cb) {

            var extArray = file.mimetype.split("/");
            var extension = extArray[extArray.length - 1];

            cb(null, 'widget_image_' + Date.now() + '.' + extension)
        }
    });
    var upload = multer({storage : storage});
    app.post ("/api/upload", upload.single('myFile'), uploadImage);


    function uploadImage(req, res) {
        var pageId        = req.body.pageId;
        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var userId        = req.body.userId;
        var websiteId     = req.body.websiteId;
        var myFile        = req.file;
        var destination = myFile.destination; // folder where file is saved to

        for (var i in widgets) {
            if (widgets[i]._id === widgetId) {
                widgets[i].width = width;
                widgets[i].url = req.protocol + '://' +req.get('host')+"/uploads/"+myFile.filename;
                pageId = widgets[i].pageId;
            }
        }

        res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/");
    }

    var widgets=[
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

    function createWidget(req,res) {
        var id = (new Date()).getTime().toString()
        var pageId=req.params.pageId;
        var widget=req.body;
        widget._id =id;
        widget.pageId = pageId.toString();

        widgets.push(widget);
        res.json(widget);
        return;
    }

    function findAllWidgets(req,res) {
        pageId=req.params.pageId;
        var pgs=[];
        for (var w in widgets){
            if (widgets[w].pageId==pageId){
                pgs.push(widgets[w]);
            }

        }
        res.send(pgs);
    }

    function updateWidget(req,res) {
        var widgetId=req.params.widgetId;
        var widget=req.body;
        for (var w in widgets){
            if (widgets[w]._id==widgetId){
                if (widgets[w].widgetType=='HEADER'){
                    widgets[w].text=widget.text;
                    widgets[w].size=widget.size;
                }
                else if (widgets[w].widgetType=='YOUTUBE'){
                    widgets[w].width=widget.width;
                    widgets[w].name=widget.name;
                    widgets[w].url=widget.url;
                }
                else if (widgets[w].widgetType=='HTML'){
                    widgets[w].text=widget.text;
                }
                else if (widgets[w].widgetType=='IMAGE'){
                    widgets[w].name=widget.name;
                    widgets[w].width=widget.width;
                    widgets[w].url=widget.url;
                }
                res.sendStatus(200);
                return;
            }
        }
    }
    function deleteWidget(req,res) {
        var widgetId=req.params.widgetId;
        for(var w in widgets){
            if(widgets[w]._id==widgetId){
                widgets.splice(w,1);
                res.sendStatus(200);
                return;
            }
        }
    }

    function findWidgetById(req,res) {
        var widgetId=req.params.widgetId;
        for (var w in widgets){
            if (widgets[w]._id==widgetId){
                res.json(widgets[w]);
                return;
            }
        }
    }
}
