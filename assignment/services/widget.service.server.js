module.exports = function (app,WidgetModel,PageModel) {

    app.get("/api/user/:userId/website/:websiteId/page/:pageId/widget", findAllWidgets);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/page/:pageId/widget/:widgetId", deleteWidget);
    app.post("/api/page/:pageId/widget", createWidget);
    app.put("/api/page/")
    app.put("/page/:pageId/widget",updateOrder);

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

        // for (var i in widgets) {
        //     if (widgets[i]._id === widgetId) {
        //         widgets[i].width = width;
        //         widgets[i].url = req.protocol + '://' +req.get('host')+"/uploads/"+myFile.filename;
        //         pageId = widgets[i].pageId;
        //     }
        // }
        WidgetModel
            .findWidgetById(widgetId)
            .then(function (widget) {
                widget.url = req.protocol + '://' +req.get('host')+"/uploads/"+myFile.filename;
                widget.width = width
                WidgetModel
                    .updateWidget(widgetId,widget)
                    .then(function (widget) {
                        res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/");
                        res.send(200)
                    })
            })

    }

    // var widgets=[
    //     { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
    //     { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    //     { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
    //         "url": "http://lorempixel.com/400/200/"},
    //     { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    //     { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    //     { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
    //         "url": "https://youtu.be/AM2Ivdi9c4E" },
    //     { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    // ];
    function updateOrder(req,res) {
        var pageId = req.params.pageId;
        var start = parseInt(req.query.initial)
        var end = parseInt(req.query.final)

        WidgetModel
            .reorderWidget(pageId,start,end)
            .then(function (status) {
                res.sendStatus(status)
            },function (err) {
                res.sendStatus(400)
            });
    }
    function createWidget(req,res) {
        var pageId=req.params.pageId;
        var widget;
        widget=  req.body;
        widget._page = pageId;
        WidgetModel
            .createWidget(widget,pageId)
            .then(function (widget) {
                var id = widget._id;
                PageModel
                    .addWidget(pageId,id)
                    .then(function (page) {
                        res.json(widget)
                    },function (err) {
                        res.send(err)
                    })
                res.json(widget)
            })
    }

    function findAllWidgets(req,res) {
        pageId=req.params.pageId;
        WidgetModel
            .findAllWidgetsForPage(pageId)
            .then(function (widget) {
                res.json(widget)
            }, function (err) {
                res.send(err)
            })
    }

    function updateWidget(req,res) {
        var widgetId=req.params.widgetId;
        var widget=req.body;
        WidgetModel
            .updateWidget(widgetId,widget)
            .then(function (widget) {
                res.sendStatus(200)
            },function (err) {
                res.send(err)
            })
    }

    function deleteWidget(req,res) {
        var widgetId=req.params.widgetId;
        var pageId = req.params.pageId;
        console.log(pageId)
        WidgetModel
            .deleteWidget(widgetId)
            .then(
                function (status) {
                    PageModel
                        .findPageById(pageId)
                        .then(function (page) {
                            i = page.widgets.indexOf(widgetId)
                            console.log(i)
                            page.widgets.splice(i,1)
                            console.log(page.widgets)
                            PageModel
                                .updatePage(pageId,page)
                                .then(function (page) {
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

    function findWidgetById(req,res) {
        var widgetId=req.params.widgetId;
        WidgetModel
            .findWidgetById(widgetId)
            .then(function (widget) {
                res.json(widget)
            },
            function (err) {
                res.send(err)
            })
    }
}
