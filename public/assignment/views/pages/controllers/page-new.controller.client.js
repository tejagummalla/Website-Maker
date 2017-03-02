/**
 * Created by tejag on 2/10/2017.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("PageNewController",PageNewController)

    function PageNewController(PageService,$routeParams,$location) {
        var vm=this
        vm.userId=$routeParams.uid;
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
            PageService
                .createPage(vm.websiteId,page)
                .success(function () {
                    $location.url("user/"+vm.userId+"/website/"+vm.websiteId+"/page")
            })
        }
    }
})();