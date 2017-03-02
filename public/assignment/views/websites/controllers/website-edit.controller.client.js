(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController",WebsiteEditController)
        function WebsiteEditController($routeParams,WebsiteService,$location) {

            var vm=this
            vm.userId=$routeParams.uid
            vm.websiteId = $routeParams.wid;
            vm.deleteWebsite = deleteWebsite;
            vm.updateWebsite = updateWebsite;


            function init() {
                WebsiteService
                    .findWebsiteByUser(vm.userId)
                    .success(function (web) {
                        vm.websites=web
                    })
                WebsiteService
                    .findWebsiteById(vm.websiteId)
                    .success(function (website) {
                        vm.website=website;
                    })

            }
            init();

            function deleteWebsite () {
                WebsiteService
                    .deleteWebsite(vm.websiteId)
                    .success(function (wId) {
                        vm.message="Successfully deleted Website"+wId;
                        $location.url("/user/"+vm.userId+"/website");

                    })

            };

            function updateWebsite() {
                WebsiteService
                    .updateWebsite(vm.websiteId,vm.website)
                    .success(function () {
                        $location.url("/user/"+vm.userId+"/website");
                    })
            };
        }
})();
