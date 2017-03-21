

    var mongoose = require('mongoose');
    var PageSchema = require('./page.schema.server');
    var PageModel = mongoose.model('PageModel',PageSchema);
    var model = {}

    var q = require('q');

    var api={
        createPage : createPage,
        deletePage : deletePage,
        updatePage : updatePage,
        findPageById : findPageById,
        findPageByWebsiteId: findPageByWebsiteId,
        addWidget : addWidget,
        setmodel : setmodel,
        deleteAllPages : deleteAllPages
    }

    module.exports=api;

    function createPage(page){
        var d = q.defer();
        PageModel
            .create(page,function (err,page) {
                if(err){
                    d.abort(err)
                }else{
                    d.resolve(page)
                }
            })
        return d.promise
    }

    function updatePage(pageId,page) {
        var d = q.defer();
        PageModel
            .update({_id:pageId},
                {name: page.name, description: page.description, title: page.title,widgets: page.widgets},function (err,page) {
                    if(err){
                        d.abort(err)
                    }else{
                        d.resolve(page)
                    }
                })
        return d.promise;
    }

    function setmodel(mod) {
        model=mod;
    }

    function deletePage(pageId) {
        var d = q.defer();
        PageModel
            .remove({_id:pageId}, function (err,status) {
                if(err){
                    d.abort(err)
                }else{
                    d.resolve(status)
                }
            });
        console.log(pageId)
        return d.promise;
    }

    function deleteAllPages(websiteId) {
        var d = q.defer()
        PageModel
            .find({_website:{"$in":websiteId}},function (err,pages) {
                d.resolve(pages)
                for(p in pages){
                    //console.log(pages[p]._id)
                    deletePage(pages[p]._id)
                    model.WidgetModel
                        .deleteAllWidgets(pages[p]._id)
                        .then(function (status) {
                            console.log('Done deleting Pages.')
                            //console.log(pages[p]._id)
                        })
                }
            })
        return d.promise;
    }

    function findPageById(pageId){
        var d = q.defer();
        PageModel
            .findById(pageId,function (err,page) {
                if (err){
                    d.abort(err)
                } else{
                    d.resolve(page)
                }
            })
        return d.promise;
    }

    function addWidget(pageId,widgetId) {
        var d = q.defer();
        findPageById(pageId)
            .then(function (page) {
                page.widgets.push(widgetId)
                page.save(function (err,page) {
                    d.resolve(page)
                })
            });
        return d.promise;
    }
    function findPageByWebsiteId(websiteId) {
        var d = q.defer()
        PageModel
            .find({_website : websiteId}, function (err,pages) {
                if(err){
                    d.abort(err)
                }else{
                    d.resolve(pages)
                }
            })
        return d.promise;
    }
