module.exports = function (app) {

    app.get("/api/user", findUser);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.post("/api/user", createUser);
    app.delete("/api/user/:userId", deleteUser);



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

    function updateUser(req,res) {
        var userId = req.params.userId;
        var user= req.body;
        for (var use in users){
            if(users[use]._id==userId){
                users[use].firstName=user.firstName;
                users[use].lastName=user.lastName;
                users[use].email=user.email;
                res.json(user[use]);
                break;
            }
        }
        return null;
    }
    function createUser(req,res) {
        var newUser=req.body;
        newUser._id=(new Date()).getTime();
        users.push(newUser);
        res.json(newUser);
    }
    function findUserById(req,res) {
        var userId= req.params.userId;
        var user= users.find((function (u) {
            return u._id==userId;
        }))
        res.json(user);
    }
    function findUser(req,res) {
        var username = req.query.username;
        var password = req.query.password;

        if (username && password){
            findUserByCredentials(req,res);
        }
        else if (username){
            findUserByUsername(req,res);
        }
    }

    function findUserByCredentials(req,res) {
        var user= users.find(function (user) {
            return user.password== req.query.password && user.username == req.query.username
        });
        res.json(user)
    }

    function deleteUser(req,res) {
        var userId= req.params.userId;
        for (var use in users){
            if(users[use]._id==userId){
                users.splice(use,1);
                res.sendStatus(200);
                return;
            }
        }
    }
    function findUserByUsername(req,res) {
        var user = users.find(function (user) {
            return user.username== req.query.username;
        });
        if (user){
            res.json(user);
        }
        else {
            res.sendStatus(404);
        }
    }
}