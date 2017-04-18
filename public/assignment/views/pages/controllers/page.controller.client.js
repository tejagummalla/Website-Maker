/**
 * Created by tejag on 2/10/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("PageController",PageController)
        function PageController(PageService,$routeParams,$rootScope) {

            var vm=this
            vm.user = $rootScope.currentUser;
            vm.userId= vm.user._id;
            vm.websiteId=$routeParams.wid;

            function init(){
                PageService
                    .findPageByWebsiteId(vm.websiteId,vm.userId)
                    .success(function (pages) {
                    vm.pages=pages;
                })
            }

            init();
        }
})();