/**
 * Created by tejag on 2/10/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .service("WidgetService",WidgetService)

        function WidgetService($http) {
            this.findAllWidgets=findAllWidgets;
            this.findWidgetById=findWidgetById;
            this.deleteWidget=deleteWidget;
            this.updateWidget=updateWidget;
            this.createWidget=createWidget;

            function findAllWidgets(pageId,websiteId,userId) {
                return $http.get("/api/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget");
            }

            function createWidget(pageId,widget) {
                return $http.post("/api/page/"+pageId+"/widget",{"widgetType":widget});
                // var id = (new Date()).getTime();
                // widgets.push({"_id":id.toString(), "widgetType":widget, "pageId":pageId})
                // return id;

            }

            function findWidgetById(wgid) {
                return $http.get("/api/widget/"+wgid);

                return null;
            }

            function deleteWidget(widgetId) {
                return $http.delete("/api/widget/"+widgetId);
                for(var w in widgets){
                    if(widgets[w]._id==widgetId){
                        widgets.splice(w,1);
                    }
                }
            }

            function updateWidget(widget,widgetId) {
                return $http.put("/api/widget/"+widgetId, widget);
                // for(var w in widgets){
                //     if(widgets[w]._id==widgetId){
                //         if (widgets[w].widgetType=="HEADER") {
                //             widgets[w].size=widget.size;
                //             widgets[w].text=widget.text;
                //             widgets[w].name=widget.name;
                //         }
                //         else if(widgets[w].widgetType=="YOUTUBE"){
                //             widgets[w].text=widget.text;
                //             widgets[w].name=widget.name;
                //             widgets[w].url=widget.url;
                //             widgets[w].width=widget.width;
                //         }
                //         else if (widgets[w].widgetType=="IMAGE"){
                //             widgets[w].width=widget.width;
                //             widgets[w].url=widget.url;
                //         }
                //         else if (widgets[w].widgetType=="HTML"){
                //             widgets[w].text=widget.text;
                //         }
                //     }
                // }
            }
        }
})();