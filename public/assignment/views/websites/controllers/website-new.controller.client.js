
(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController",websiteNewController)

    function websiteNewController(WebsiteService,$routeParams,$location) {
        var vm=this;
        vm.userId=$routeParams.uid;
        vm.createWebsite=createWebsite;
        WebsiteService
            .findWebsiteByUser(vm.userId)
            .success(function (web) {
                vm.websites=web
            });

        function createWebsite(website) {

            WebsiteService
                .createWebsite(vm.userId,website)
                .success(function () {
                    $location.url("/user/"+vm.userId+"/website");
                })

        }

    }
})();