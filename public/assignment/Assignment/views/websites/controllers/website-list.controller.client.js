/**
 * Created by tejag on 2/9/2017.
 */
(function (){
    angular
        .module("WebAppMaker")
        .controller("WebsiteController",WebsiteController)
        
        function WebsiteController($routeParams,WebsiteService) {

        var vm=this;
        vm.userId=$routeParams.uid
        vm.websites=WebsiteService.findWebsiteByUser(vm.userId)

        }
} 
    
)();