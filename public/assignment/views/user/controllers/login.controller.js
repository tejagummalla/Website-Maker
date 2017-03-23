/**
 * Created by tejag on 2/7/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController",LoginController);
        function LoginController(LoginService, $location,$routeParams) {

            var vm = this;
            vm.login =  login;
            vm.userId=$routeParams.uid;

            function login(user) {
                if (!user){
                    vm.error="Please Enter Username and Password!"
                }
                else if (!user.username){
                    vm.error="Please Enter a Username"
                }
                else if(!user.password){
                    vm.error="Please Enter a Password"
                }
                else {
                    LoginService
                        .findByCredential(user.username ,user.password)
                        .success(function (user) {
                            if (user.length >0){
                                $location.url("/user/"+user["0"]._id)
                            }
                            else {
                                vm.error= "user not found!"
                            }
                        });

                }

            }




        }
})();