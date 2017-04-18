
(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController",WidgetEditController)

        function WidgetEditController(WidgetService,$routeParams,$location) {
            var vm=this;
            vm.userId=$routeParams.uid;
            vm.websiteId=$routeParams.wid;
            vm.pageId=$routeParams.pid;
            vm.widgetId=$routeParams.wgid;
            vm.widgetDelete=widgetDelete;
            vm.widgetUpdate=widgetUpdate;

            function init() {
                WidgetService
                    .findWidgetById(vm.widgetId)
                    .success(function (widget) {
                     vm.widget=widget;
                })
            }
            init();

            function widgetDelete(){
                console.log(vm.widget.name)
                if(vm.widget.name){
                    WidgetService
                        .deleteWidget(vm.widgetId,vm.pageId)
                        .success(function () {
                            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                        })
                }

            }

            function widgetUpdate() {
                if(vm.widget && vm.widget.name){
                    WidgetService
                        .updateWidget(vm.widget,vm.widgetId)
                        .success(function () {
                            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                        })
                }
            }


        }


})();