(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController",RegisterController)
        function RegisterController(LoginService,$location,$rootScope) {
            var vm=this;
            vm.createUser=createUser;

            function createUser(user) {

                if(!user.username || !user.password){

                }
                else if (user.cpassword == user.password) {

                    LoginService
                        .findUserByUsername(user.username)
                        .success(function (user) {
                            vm.message="This username is already taken!"
                        })
                        .error(function (err) {
                            LoginService
                                .register(user)
                                .success(function (user) {
                                    console.log(user._id)
                                    $rootScope.currentUser = user;
                                    $location.url('/user');
                                })
                                .error(function () {
                                    vm.error="sorry could not register!"
                                })
                        })



                }else{
                    vm.error = "The passwords do not match!"
                }

            }
        }
})();