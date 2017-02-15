/**
 * Created by tejag on 2/10/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("PageController",PageController)
        function PageController(PageService,$routeParams) {

            var vm=this
            vm.userId=$routeParams.uid;
            vm.websiteId=$routeParams.wid;

            function init(){
                vm.pages=PageService.findPageByWebsiteId(vm.websiteId);
            }

            init();
        }
})();