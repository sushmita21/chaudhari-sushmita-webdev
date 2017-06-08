/**
 * Created by ch_su_000 on 05/06/2017.
 */

var mongoose = require('mongoose');
var userSchema = require('./user.schema.server')
var userModel = mongoose.model('UserModel', userSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findAllUsers = findAllUsers;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.addWebsite = addWebsite;
modules.export = userModel;

function createUser(user) {
    return userModel.create(user);
}
function findUserById(userId) {
    return userModel.findById(userId);
}
function findAllUsers(users)
{
    return userModel.find();
}
function findUserByUsername(username) {
    return userModel.findOne({username:username});
}
function findUserByCredentials(username, password) {
    return userModel.findOne({username:username, password: password});
}
function updateUser(userId, newUser)
{
    return userModel.update({_id: userId},{$set:newUser});
}
function deleteUser(userId) {
    return userModel.remove({_id: userId});
}

fucntion(userId, websiteId)
{
    return userModel.findById(userId)
        .then(function(user)
    {
       user.websites.push(websiteId);
       return user.save();
    });
}
