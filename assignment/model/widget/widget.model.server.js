

    var mongoose = require('mongoose');
    var q= require('q');

    var WidgetSchema = require('./widget.scheme.server')

    var WidgetModel = mongoose.model("WidgetModel",WidgetSchema)

    var api ={
        createWidget : createWidget,
        findAllWidgetsForPage : findAllWidgetsForPage,
        updateWidget : updateWidget,
        deleteWidget : deleteWidget,
        findWidgetById : findWidgetById,
        deleteAllWidgets : deleteAllWidgets
        //recorderWidget : recorderWidget
    }

    module.exports = api

    function createWidget(widget){
        var d = q.defer();
        WidgetModel
            .create(widget,function (err,widget) {
                if(err){
                    d.abort(err)
                }else{
                    d.resolve(widget)
                }
            })
        return d.promise
    }

    function deleteWidget(widgetId) {
        var d = q.defer();
        WidgetModel
            .remove({_id : widgetId},function (err,widget) {
                if(err){
                    d.abort(err)
                }else {
                    d.resolve(widget)
                }
            })
        return d.promise;
    }
    function updateWidget(widgetId,widget) {
        var d = q.defer();
        WidgetModel
            .update({_id:widgetId},{$set : widget},function (err,widget) {
                    if(err){
                        d.abort(err)
                    }else{
                        d.resolve(widget)
                    }
                })
        return d.promise;
    }

    function deleteAllWidgets(pageId) {
        var d=q.defer();
        console.log('hello')
        WidgetModel
            .remove({_page: {"$in":pageId}},function (err,status) {
                if (err){
                    d.abort(err)
                }else {
                    d.resolve(status)
                }
            })
        return d.promise;
    }
    function findWidgetById(widgetId){
        var d = q.defer()
        WidgetModel
            .findById(widgetId,function (err,widget) {
                if (err){
                    d.abort(err)
                } else{
                    d.resolve(widget)
                }
            })
        return d.promise;
    }

    function findAllWidgetsForPage(pageId) {
        var d=q.defer();
        WidgetModel
            .find({_page:pageId},function (err,widget) {
                if(err){
                    d.abort(err)
                }else{
                    d.resolve(widget)
                }
            })
        return d.promise;
    }