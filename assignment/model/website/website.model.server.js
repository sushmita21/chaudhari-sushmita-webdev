/**
 * Created by ch_su_000 on 07/06/2017.
 */
var mongoose = require('mongoose');
var websiteSchema = require('./website.schema.server');
var websiteModel = mongoose.model('WebsiteModel', websiteSchema);
module.exports = websiteModel;
var userModel = require('../user/user.model.server');
var pageModel = require('../page/page.model.server');


websiteModel.findWebsitesByUser = findWebsitesByUser;
websiteModel.createWebsiteForUser = createWebsiteForUser;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;
websiteModel.deleteWebsiteChildren = deleteWebsiteChildren;
websiteModel.findWebsiteById = findWebsiteById;


function findWebsiteById(websiteId)
{
    console.log("jnnnnnnnnnn");
    return websiteModel.findOne({_id:websiteId});
}


function createWebsiteForUser(userId, website)
{
    return websiteModel
        .create(website)
        .then(function (website) {
            return userModel
                .findUserById(userId)
                .then(function (user) {
                        website._user = user._id;
                        user.websites.push(website._id);
                        website.save();
                        user.save();
                        return website;
                    },
                    function()
                    {
                        return err;
                    })
        }, function (err) {
            return err;
        });
}

function findWebsitesByUser(userId)
{
    return websiteModel.find({"_user": userId});

}
function updateWebsite(websiteId, updatedWebsite)
{
    return websiteModel.update({_id: websiteId},{$set:updatedWebsite});
}
function deleteWebsite(websiteId) {
    return websiteModel
        .findOne({_id:websiteId})
        .populate('_user')
        .then(function (website) {
            website._user.websites.splice(website._user.websites.indexOf(websiteId),1);
            website._user.save();
            return deleteWebsiteChildren(websiteId);
        }, function (err) {
            return err;
        });
}


function deleteWebsiteChildren(websiteId){
    return websiteModel.findById({_id: websiteId}).select({'pages':1})
        .then(function (website) {
            var pagesOfWebsite = website.pages;
            return recursiveDelete(pagesOfWebsite, websiteId);
        }, function (err) {
            return err;
        });
}

function recursiveDelete(pagesOfWebsite, websiteId) {
    if(pagesOfWebsite.length == 0){
        return websiteModel.remove({_id: websiteId})
            .then(function (response) {
                if(response.result.n == 1 && response.result.ok == 1){
                    return response;
                }
            }, function (err) {
                return err;
            });
    }

    return pageModel.deletePageChildren(pagesOfWebsite.shift())
        .then(function (response) {
            if(response.result.n == 1 && response.result.ok == 1){
                return recursiveDelete(pagesOfWebsite, websiteId);
            }
        }, function (err) {
            return err;
        });
}