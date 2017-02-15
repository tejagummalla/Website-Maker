/**
 * Created by tejag on 2/10/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController",websiteNewController)

    function websiteNewController(WebsiteService,$routeParams,$location) {
        var vm=this;
        vm.userId=$routeParams.uid;
        vm.createWebsite=createWebsite;
        vm.websites=WebsiteService.findWebsiteByUser(vm.userId);

        function createWebsite(website) {
            WebsiteService.createWebsite(vm.userId,website)
            $location.url("/user/"+vm.userId+"/website");

        }

    }
})();