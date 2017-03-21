

var model={};
var mongoose = require('mongoose')
var UserSchema = require('./user.schema.server');

var userModel = mongoose.model("UserModel",UserSchema);
var q= require('q');

var api={
    createUser : createUser,
    findUserById : findUserById,
    findUserByUsername : findUserByUsername,
    findUserByCredential : findUserByCredential,
    updateUser : updateUser,
    deleteUser: deleteUser,
    addWebsite : addWebsite
}


//         //updateUser: updateUser,
//         //deleteUser: deleteUser

module.exports=api;


    function setmodel(_model) {
        model = _model
    }
    function createUser(user) {
        var d = q.defer();
        userModel
            .create(user, function (err,user) {
                if (err){
                    d.abort(err)
                } else{
                    d.resolve(user)
                }
            })
        return d.promise;
    }
    
    function addWebsite(userId,WebsiteId){
        var d = q.defer();
        console.log(WebsiteId)
        findUserById(userId)
            .then(function (user) {
                user.websites.push(WebsiteId);
                user.save(function (err,user) {
                    d.resolve(user)
                })
            });
        return d.promise

    }

    function findUserById(id) {
        var d = q.defer()
        userModel
            .findById(id, function (err,user) {
                if(err){
                    d.abort(err)
                } else{
                    d.resolve(user)
                }
            })
        return d.promise;

    }

    function deleteUser(userId) {
        var d=q.defer();
        userModel
            .remove({_id : userId})
            .then(function (err,status) {
                if(err){
                    d.abort(err)
                }else{
                    d.resolve(status)
                }
            })
        return d.promise;
    }

    function updateUser(userId,user) {
        var d= q.defer()
        console.log(user.websites)

        userModel
            .update({_id : userId },
                {'firstname':user.firstname, 'lastname':user.lastname, 'email': user.email, 'websites' : user.websites},
                function (err,user) {
                    if (err){
                        d.abort(err)
                    }else {
                        d.resolve(user)
                    }
                });
            return d.promise;
    }
    function findUserByUsername(username) {
        var d = q.defer();

        userModel
            .find({
                username: username
            }, function (err, user) {
                if (err){
                    d.abort(err)
                }
                else{
                    d.resolve(user);
                }
            })
        return d.promise;
    }
    function findUserByCredential(username,password) {
        var d= q.defer();
        userModel
            .find({
                password: password,
                username: username
            },function (err,user) {
                if(err){
                    d.abort(err)
                }else{
                    d.resolve(user)
                }
            });
        return d.promise;

    }
