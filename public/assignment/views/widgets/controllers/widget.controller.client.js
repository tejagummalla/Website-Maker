(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetController",WidgetController)
    function WidgetController(WidgetService,$routeParams,$sce,$location) {
        var vm=this;
        vm.userId=$routeParams.uid;
        vm.websiteId=$routeParams.wid;
        vm.pageId=$routeParams.pid;
        vm.fetchYoutube= fetchYoutube;
        vm.getTrustedHtml=getTrustedHtml;

        function init() {
            WidgetService
                .findAllWidgets(vm.pageId,vm.websiteId,vm.userId)
                .success(function (widgets) {
                vm.widgets = widgets;
            })
        }
        init();
        function fetchYoutube(url) {
            var parts = url.split('/');
            var code=parts[parts.length-1];
            return $sce.trustAsResourceUrl('https://www.youtube.com/embed/'+code);
        }

        function getTrustedHtml(html) {
           return $sce.trustAsHtml(html)
        }
    }
})();