/**
 * Created by ch_su_000 on 07/06/2017.
 */
var mongoose = require('mongoose');
var pageSchema = require('./page.schema.server');
var pageModel = mongoose.model('PageModel', pageSchema);
module.exports = pageModel;
var websiteModel = require('../website/website.model.server');
var widgetModel = require('../widget/widget.model.server');

pageModel.createPage= createPage;
pageModel.findPageByWebsiteId= findPageByWebsiteId;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;
pageModel.deletePageChildren = deletePageChildren;


function findPageByWebsiteId(websiteId){
    return pageModel.find({_website:websiteId});
}
function findPageById(pageId){
    return pageModel.findOne({_id:pageId});
}
function updatePage(pageId, updatedPage){
    return pageModel.update({_id:pageId},{$set: updatedPage});
}

function createPage(websiteId, newPage) {
    return pageModel
        .create(newPage)
        .then(function (page) {
            console.log("pageCreated");
            return websiteModel
                .findWebsiteById(websiteId)
                .then(function (website) {

                        website.pages.push(page._id);
                        page._website = website._id;
                        website.save();
                        page.save();
                        return page;

                    },
                    function(err)
                    {
                        return err;
                    })
        }, function (err) {
            return err;
        });
}

function deletePage(pageId) {
    return pageModel
        .findOne({ _id: pageId})
        .populate('_website')
        .then(function (page) {
            page._website.pages.splice(page._website.pages.indexOf(pageId),1);
            page._website.save();
            return deletePageChildren(pageId);
        }, function (err) {
            return err;
        });
}

function deletePageChildren(pageId) {

    return pageModel.findById({_id: pageId})
        .then(function (page) {
            var widgets = page.widgets;
            return recursiveDelete(widgets, pageId);
        }, function (err) {
            return err;
        });
}

function recursiveDelete(widgets, pageId) {
    if(widgets.length == 0){
        return pageModel.remove({_id: pageId})
            .then(function (response) {
                if(response.result.n == 1 && response.result.ok == 1){
                    return response;
                }
            }, function (err) {
                return err;
            });
    }

    return widgetModel.deleteWidgetOfPage(widgets.shift())//check widgetModel
        .then(function (response) {
            if(response.result.n == 1 && response.result.ok == 1){
                return recursiveDelete(widgets, pageId);
            }
        }, function (err) {
            return err;
        });

}