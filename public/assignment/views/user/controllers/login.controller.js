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
                if (user.username == null && user.password==null){
                    vm.error="Please Enter Username and Password!"
                }
                else if (user.username== null){
                    vm.error="Please Enter a Username"
                }
                else if(user.password==null){
                    vm.error="Please Enter a Password"
                }
                else {
                    var promise = LoginService.findByCredential(user.username ,user.password);
                    promise.success(function (use) {
                        if (use){
                            $location.url("/user/"+use._id)
                        }
                        else {
                            vm.error= "user not found!"
                        }
                    });

                }

            }




        }
})();