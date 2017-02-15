
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
                vm.widget=WidgetService.findWidgetById(vm.widgetId);

            }
            init();
            function widgetDelete(){
                WidgetService.deleteWidget(vm.widgetId);
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
            }

            function widgetUpdate() {
                WidgetService.updateWidget(vm.widget,vm.widgetId);
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
            }


        }


})();