/**
 * Created by tejag on 2/7/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController",LoginController);
        function LoginController(LoginService, $location,$routeParams, $rootScope) {

            var vm = this;
            vm.login =  login;
            vm.userId=$routeParams.uid;

            function login(user) {
                if (!user){
                    vm.error="Please Enter Username and Password!"
                }
                // else if (!user.username){
                //     vm.error="Please Enter a Username"
                // }
                // else if(!user.password){
                //     vm.error="Please Enter a Password"
                // }
                else {
                    LoginService
                        .findByCredential(user)
                        .success(function (user) {
                            if (user){
                                $rootScope.currentUser = user;
                                console.log(user)
                                $location.url("/user")
                            }
                            else {
                                vm.error= "user not found!"
                            }
                        });

                }

            }




        }
})();