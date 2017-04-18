(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController",WebsiteEditController)
        function WebsiteEditController($routeParams,WebsiteService,$location,$rootScope) {

            var vm=this
            vm.user = $rootScope.currentUser;
            vm.userId= vm.user._id;
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
                if(!vm.website || !vm.website.name){

                }
                else{
                    WebsiteService
                        .deleteWebsite(vm.websiteId,vm.userId)
                        .success(function (wId) {
                            vm.message="Successfully deleted Website"+wId;
                            $location.url("/user/website");

                        })
                }
            };

            function updateWebsite() {
                if(!vm.website || !vm.website.name){

                }else{
                    WebsiteService
                        .updateWebsite(vm.websiteId,vm.website)
                        .success(function () {
                            $location.url("/user/website");
                        })
                }

            };
        }
})();
