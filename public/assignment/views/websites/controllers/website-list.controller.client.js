/**
 * Created by tejag on 2/9/2017.
 */
(function (){
    angular
        .module("WebAppMaker")
        .controller("WebsiteController",WebsiteController)
        
        function WebsiteController($routeParams,WebsiteService,$rootScope) {

        var vm=this;
            vm.user = $rootScope.currentUser;
            vm.userId= vm.user._id;
        WebsiteService
            .findWebsiteByUser(vm.userId)
            .success(function (web) {
                vm.websites=web
            })
        }
} 
    
)();