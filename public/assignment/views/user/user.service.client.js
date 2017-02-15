
(function () {
    angular
        .module("WebAppMaker")
        .factory("LoginService",loginService);
    function loginService() {
        var users=[
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",
                lastName: "Wonder", email: "alice.wonder@gmail.com"},
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley",
            email:"marley.b@gmail.com"},
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia",
            email:"gracia.c@yahoo.in"},
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi",
            email:"jannunzi@gmail.com"}
        ];

        var api={
            "findByCredential" : findByCredential,
            "findById" : findById,
            "createUser": createUser,
            "deleteUser":deleteUser,
            "updateUser":updateUser
        };
        return api;

        function findById(userId) {
            for (var use in users){
                var user = users[use];
                if(user._id === userId){
                    return user

                }
            }
            return null;
        }
        function findByCredential(username,password) {
            for (var use in users){
                var user = users[use];
                if(user.username === username &&
                user.password=== password){
                    return user

                }
            }
            return null;
        }

        function createUser(user) {
            var id=(new Date()).getTime();
            users.push({_id:id.toString(), username:user.username, password:user.password,
                firstName:user.fname, lastName:user.lname , email:user.email});
            return id;
        }
        
        function deleteUser(userId) {
            for (var use in users){
                if(users[use]._id==userId){
                    users.splice(use,1);
                }
            }
        }

        function updateUser(user) {
            for (var use in users){
                if(users[use]._id==user._id){
                    users[use].firstName=user.firstName;
                    users[use].lastName=user.lastName;
                    users[use].email=user.email;
                }
            }
            return null;
        }
    }
})();