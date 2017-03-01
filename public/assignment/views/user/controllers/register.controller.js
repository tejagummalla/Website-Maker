(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController",RegisterController)
        function RegisterController(LoginService,$location) {
            var vm=this;
            vm.createUser=createUser;
            
            function createUser(user) {

                LoginService
                    .findUserByUsername(user.username)
                    .success(function (user) {
                        vm.message="This username is already taken!"
                    })
                    .error(function (err) {
                        LoginService
                            .createUser(user)
                            .success(function (user) {
                                $location.url('/user/'+user._id);
                            })
                            .error(function () {
                                vm.error="sorry could not register!"
                            })
                    })

            }
        }
})();