(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController",RegisterController)
        function RegisterController(LoginService,$location) {
            var vm=this;
            vm.createUser=createUser;
            
            function createUser(user) {
                if (user.password==user.cpassword){
                    var id=LoginService.createUser(user);
                    $location.url("user/"+id);
                }
                else{
                    vm.error="Sorry Passwords Do not Match!"
                }
            }
        }
})();