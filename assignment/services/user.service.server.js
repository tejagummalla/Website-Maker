module.exports = function (app,UserModel,WebsiteModel) {

    app.get("/api/user", findUser);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.post("/api/user", createUser);
    app.delete("/api/user/:userId", deleteUser);


    function updateUser(req,res) {
        var userId = req.params.userId;
        var user= req.body;
        UserModel
            .updateUser(userId,user)
            .then(function (user) {
                res.sendStatus(200)
            },function (err) {
                res.send(err)
            })
    }
    function createUser(req,res) {
        var newUser=req.body;
        UserModel
            .createUser(newUser)
            .then(function (user) {
                res.json(user)
            }, function (err) {
                res.send(err)
            })

    }
    function findUserById(req,res) {
        var userId= req.params.userId;
        UserModel
            .findUserById(userId)
            .then(function (user) {
                res.json(user)
            },function (err) {
                res.send(err)
            })
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
        UserModel
            .findUserByCredential(req.query.username,req.query.password)
            .then(function (user) {
                res.json(user)
            },function (err) {
                res.send(err)
            })
    }

    function deleteUser(req,res) {
        var userId= req.params.userId;
        WebsiteModel
            .deleteAllWebsites(userId)
            .then(function (status) {
                UserModel
                    .deleteUser(userId)
                    .then(function (status) {
                        res.sendStatus(200)
                    })
                res.sendStatus(200)
            })

    }
    function findUserByUsername(req,res) {
        UserModel
            .findUserByUsername(req.query.username)
            .then(function (user) {
                if (user.length === 0){
                    res.sendStatus(404)
                }
                else{
                    res.json(user)
                }
            })
    }
}