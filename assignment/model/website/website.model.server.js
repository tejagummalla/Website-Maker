

var mongoose = require('mongoose')
var websiteSchema  = require('./website.schema.server')
var WebsiteModel = mongoose.model('WebsiteModel',websiteSchema)
var q=require('q');
var model={}

var api = {
    createWebsite : createWebsite,
    updateWebsite : updateWebsite,
    deleteWebsite : deleteWebsite,
    findWebsiteById : findWebsiteById,
    findWebsiteByUserId : findWebsiteByUserId,
    addPage : addPage,
    setmodel:setmodel,
    deleteAllWebsites: deleteAllWebsites
}

module.exports=api;

    function setmodel(mod) {
        model=mod;
    }

    function createWebsite(website){
        var d = q.defer();
        WebsiteModel
            .create(website,function (err,website) {
                if(err){
                    d.abort(err)
                }else{
                    d.resolve(website)
                }
            })
        return d.promise
    }

    function updateWebsite(websiteId,website) {
        var d = q.defer();
        WebsiteModel
            .update({_id:websiteId},
                {name: website.name, description: website.description, pages: website.pages},function (err,website) {
                    if(err){
                        d.abort(err)
                    }else{
                        d.resolve(website)
                    }
                })
        return d.promise;
    }

    function deleteAllWebsites(userId) {
        var d= q.defer();
        WebsiteModel
            .find({_user:{'$in':userId}},
            function (err,websites) {
                if(err){
                    d.abort(err)
                }else{
                    console.log(websites)

                    for(w in websites){
                        deleteWebsite(websites[w]._id)
                        model.PageModel
                            .deleteAllPages(websites[w]._id)
                            .then(function (status) {
                                console.log('Done.')
                            })
                    }
                    d.resolve(websites)

                }
            })
        console.log("return")
        return d.promise;
    }

    function findWebsiteById(websiteId){
        var d = q.defer()
        WebsiteModel
            .findById(websiteId,function (err,website) {
                if (err){
                    d.abort(err)
                } else{
                    d.resolve(website)
                }
            })
        return d.promise;
    }

    function deleteWebsite(websiteId) {
        var d = q.defer();
        WebsiteModel
            .remove({_id: websiteId},
            function (err,status) {
                if(err){
                    d.abort(err)
                }else{
                    d.resolve(status)
                }
            })
        return d.promise;
    }

    function findWebsiteByUserId(userId) {
        var d = q.defer()
        WebsiteModel
            .find({_user : userId}, function (err,websites) {
                if(err){
                    d.abort(err)
                }else{
                    d.resolve(websites)
                }
            })
        return d.promise;
    }

    function addPage(websiteId,pageId){
        var d = q.defer();
        findWebsiteById(websiteId)
            .then(function (website) {
                website.pages.push(pageId)
                website.save(function (err,web) {
                    d.resolve(web)
                })
            });
        return d.promise;
    }