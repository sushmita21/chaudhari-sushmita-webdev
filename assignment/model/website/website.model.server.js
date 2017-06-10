/**
 * Created by ch_su_000 on 07/06/2017.
 */
var mongoose = require('mongoose');
var WebsiteSchema = require('./website.schema.server')
var WebsiteModel = mongoose.model('WebsiteModel', WebsiteSchema);
var UserModel = require('../user/user.model.server');
var pageModel = require('../page/page.model.server');
var model = null;


WebsiteModel.findWebsiteById= findWebsiteById;
WebsiteModel.findWebsitesByUser = findWebsitesByUser;
WebsiteModel.createWebsiteForUser = createWebsiteForUser;
WebsiteModel.updateWebsite = updateWebsite;
WebsiteModel.deleteWebsite = deleteWebsite;
WebsiteModel.deleteWebsiteChildren = deleteWebsiteChildren;
modules.export = WebsiteModel;

function createWebsiteForUser(userId, website)
{
    return WebsiteModel
        .create(website)
        .then(function (website) {
            return model.UserModel
                .findUserById(userId)
                .then(function (user) {
                    website.user = user._id;
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

function findWebsiteById(websiteId)
{
    return WebsiteModel.findOne(websiteId);
}
function findWebsitesByUser(userId)
{
    return WebsiteModel.find({"_user": userId});

}
function updateWebsite(websiteId, updatedWebsite)
{
        return WebsiteModel.update({_id: websiteId},{$set:updatedWebsite});
}
function deleteWebsite(websiteId) {
    return WebsiteModel
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
    return WebsiteModel.findById({_id: websiteId}).select({'pages':1})
        .then(function (website) {
            var pagesOfWebsite = website.pages;
            return recursiveDelete(pagesOfWebsite, websiteId);
        }, function (err) {
            return err;
        });
}

function recursiveDelete(pagesOfWebsite, websiteId) {
    if(pagesOfWebsite.length == 0){
        return WebsiteModel.remove({_id: websiteId})
            .then(function (response) {
                if(response.result.n == 1 && response.result.ok == 1){
                    return response;
                }
            }, function (err) {
                return err;
            });
    }

    return model.pageModel.deletePageChildren(pagesOfWebsite.shift())
        .then(function (response) {
            if(response.result.n == 1 && response.result.ok == 1){
                return recursiveDelete(pagesOfWebsite, websiteId);
            }
        }, function (err) {
            return err;
        });
}
