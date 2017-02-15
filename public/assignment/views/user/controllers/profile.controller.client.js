
(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController",profileController)
    function profileController($routeParams,LoginService,$location) {
        var vm=this;
        vm.userId= $routeParams['uid'];
        vm.user= LoginService.findById(vm.userId);
        vm.deleteUser=deleteUser;
        vm.updateUser=updateUser;

        function deleteUser() {
            LoginService.deleteUser(vm.userId);
            $location.url("/login")
        }

        function updateUser() {
            LoginService.updateUser(vm.user);
        }
    }
})();
