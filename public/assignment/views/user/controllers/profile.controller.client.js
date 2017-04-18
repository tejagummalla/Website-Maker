
(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController",profileController)
    function profileController($routeParams,LoginService,$location,$rootScope) {
        var vm=this;
        vm.user = $rootScope.currentUser;
        vm.userId= vm.user._id;
        var promise= LoginService.findById(vm.userId);
        promise.success(function (user) {
            vm.user=user
        })
        vm.deleteUser=deleteUser;
        vm.updateUser=updateUser;
        vm.logout = logout;
        
        function logout() {
            LoginService
                .logout()
                .success(
                    function (response) {
                        $rootScope.currentUser = null;
                        $location.url("/login");
                    }
                )
        }

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
            console.log(vm.userId)
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
