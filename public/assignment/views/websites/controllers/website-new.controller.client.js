
(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController",websiteNewController)

    function websiteNewController(WebsiteService,$routeParams,$location,$rootScope) {
        var vm=this;
        vm.user = $rootScope.currentUser;
        vm.userId= vm.user._id;
        console.log(vm.userId)
        vm.createWebsite=createWebsite;
        WebsiteService
            .findWebsiteByUser(vm.userId)
            .success(function (web) {
                vm.websites=web
            });

        function createWebsite(website) {
            console.log(website)
            if(!website || !website.name){

            }else{
                WebsiteService
                    .createWebsite(vm.userId,website)
                    .success(function () {
                        $location.url("/user/website");
                    })
            }


        }

    }
})();