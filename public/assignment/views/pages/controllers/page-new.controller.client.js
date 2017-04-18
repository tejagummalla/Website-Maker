/**
 * Created by tejag on 2/10/2017.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("PageNewController",PageNewController)

    function PageNewController(PageService,$routeParams,$location,$rootScope) {
        var vm=this
        vm.user = $rootScope.currentUser;
        vm.userId= vm.user._id;
        vm.websiteId=$routeParams.wid;
        vm.createPage=createPage;

        function init() {
            PageService
                .findPageByWebsiteId(vm.websiteId,vm.userId)
                .success(function (pages) {
                    vm.pages=pages;
                });

        }
        init();

        function createPage(page) {
            if(page.name){
                console.log("k")
                PageService
                    .createPage(vm.websiteId,page)
                    .success(function () {
                        $location.url("user/"+vm.userId+"/website/"+vm.websiteId+"/page")
                    })
            }

        }
    }
})();