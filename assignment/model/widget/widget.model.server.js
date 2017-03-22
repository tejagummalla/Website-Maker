

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
        deleteAllWidgets : deleteAllWidgets,
        reorderWidget : reorderWidget
    };

    module.exports = api

    function createWidget(widget,pageId){
        var d = q.defer();
        WidgetModel
            .find({"_page": {'$in':pageId}},
            function (err,widgets) {
                if(err){

                }else{
                    widget.order=widgets.length;
                    WidgetModel
                        .create(widget,function (err,widget) {
                            if(err){
                                d.abort(err)
                            }else{
                                d.resolve(widget)
                            }
                        })
                }
            })

        return d.promise
    }

    function deleteWidget(widgetId) {
        var d = q.defer();
        WidgetModel
            .find({},function (err,widgets) {
                if(err){
                    d.abort(err)
                }else{

                    findWidgetById(widgetId)
                        .then(function (widget) {
                            var ord = widget.order;
                            WidgetModel
                                .remove({_id : widgetId},function (err,widget) {
                                    if(err){
                                        d.abort(err)
                                    }else {
                                        d.resolve(widget)
                                    }
                                });

                            for(w in widgets){
                                if (widgets[w].order > ord){
                                    widgets[w].order-=1;
                                    widgets[w].save();
                                }
                            }
                        });
                    d.resolve(widgets)
                }
            });
        // WidgetModel
        //     .remove({_id : widgetId},function (err,widget) {
        //         if(err){
        //             d.abort(err)
        //         }else {
        //             d.resolve(widget)
        //         }
        //     })
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

    function reorderWidget(pageId,start,end) {
        var d= q.defer();
        WidgetModel
            .find({_page:pageId},function (err,widgets) {
                    if (err){
                        d.abort(err)
                    }else{
                        widgets.forEach(function (widget) {
                            if(start<end){
                                if(widget.order == start){
                                    widget.order = end;
                                    widget.save();
                                }
                                else if(widget.order >start && widget.order <= end){
                                    widget.order = widget.order -1;
                                    widget.save();
                                }
                            } else{
                                if(widget.order == start){
                                    widget.order = end;
                                    widget.save();
                                }
                                else if(widget.order < start && widget.order >= end){
                                    widget.order = widget.order +1;
                                    widget.save();
                                }
                            }
                        });
                        d.resolve(widgets)
                    }

            });
        return d.promise;
    }