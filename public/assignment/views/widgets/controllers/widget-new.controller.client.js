(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetNewController",WidgetNewController)

        function WidgetNewController($routeParams,WidgetService,$location,$rootScope) {
            var vm=this;
            vm.user = $rootScope.currentUser;
            vm.userId= vm.user._id;
            vm.websiteId=$routeParams.wid;
            vm.pageId=$routeParams.pid;
            vm.createWidget=createWidget;

            function createWidget(type) {
                    WidgetService
                        .createWidget(vm.pageId,type)
                        .success(function (widget) {
                            console.log(widget)
                            vm.widgetId=widget._id;
                            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+vm.widgetId)
                        });
            }
        }
})();