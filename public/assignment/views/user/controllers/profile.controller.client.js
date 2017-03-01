
(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController",profileController)
    function profileController($routeParams,LoginService,$location) {
        var vm=this;
        vm.userId= $routeParams['uid'];
        var promise= LoginService.findById(vm.userId);
        promise.success(function (user) {
            vm.user=user
        })
        vm.deleteUser=deleteUser;
        vm.updateUser=updateUser;

        function deleteUser() {
            var answer= confirm("Are you sure?");
            if(answer){
                LoginService
                    .deleteUser(vm.userId)
                    .success(function () {
                        $location.url("/login")
                })
            }

        }

        function updateUser() {
            LoginService
                .updateUser(vm.userId,vm.user)
                .success(function (user) {
                    if (user!=null){
                        vm.succ="Update Successful!!"
                    }
                })

        }
    }
})();
