/**
 * Created by tejag on 2/10/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .service("WidgetService",WidgetService)

        function WidgetService() {
            this.findAllWidgets=findAllWidgets;
            this.findWidgetById=findWidgetById;
            this.deleteWidget=deleteWidget;
            this.updateWidget=updateWidget;
            this.createWidget=createWidget;
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
            function findAllWidgets(pageId) {
                var pgs=[];
                for (var w in widgets){
                    if (widgets[w].pageId==pageId){
                        pgs.push(widgets[w]);
                    }

                }
                return pgs;
            }

            function createWidget(pageId,widget) {
                var id = (new Date()).getTime();
                widgets.push({"_id":id.toString(), "widgetType":widget, "pageId":pageId})
                return id;

            }

            function findWidgetById(wgid) {
                for (var w in widgets){
                    if (widgets[w]._id==wgid){
                        return widgets[w];
                    }
                }
                return null;
            }

            function deleteWidget(widgetId) {
                for(var w in widgets){
                    if(widgets[w]._id==widgetId){
                        widgets.splice(w,1);
                    }
                }
            }

            function updateWidget(widget,widgetId) {
                for(var w in widgets){
                    if(widgets[w]._id==widgetId){
                        if (widgets[w].widgetType=="HEADER") {
                            widgets[w].size=widget.size;
                            widgets[w].text=widget.text;
                            widgets[w].name=widget.name;
                        }
                        else if(widgets[w].widgetType=="YOUTUBE"){
                            widgets[w].text=widget.text;
                            widgets[w].name=widget.name;
                            widgets[w].url=widget.url;
                            widgets[w].width=widget.width;
                        }
                        else if (widgets[w].widgetType=="IMAGE"){
                            widgets[w].width=widget.width;
                            widgets[w].url=widget.url;
                        }
                        else if (widgets[w].widgetType=="HTML"){
                            widgets[w].text=widget.text;
                        }
                    }
                }
            }
        }
})();