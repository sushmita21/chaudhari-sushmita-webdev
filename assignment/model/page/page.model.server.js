/**
 * Created by ch_su_000 on 07/06/2017.
 */
var mongoose = require('mongoose');
var widgetModel = require('../widget/widget.model.server');
var PageSchema = require('./page.schema.server')
var PageModel = mongoose.model('PageModel', PageSchema);
module.exports = PageModel;

PageModel.createPage= createPage;
PageModel.findPageByWebsiteId= findPageByWebsiteId;
PageModel.findPageById = findPageById;
PageModel.updatePage = updatePage;
PageModel.deletePage = deletePage;


function findPageByWebsiteId(websiteId){
    return PageModel.find({_website:websiteId});
}
function findPageById(pageId){
    return PageModel.find({_id:pageId});
}
function updatePage(pageId, updatedPage){
    return PageModel.update({_id:pageId},{$set: updatedPage});
}

function createPage(websiteId, newPage) {
    return PageModel
        .create(newPage)
        .then(function (page) {
            return model
                .WebsiteModel
                .findWebsiteById(websiteId)
                .then(function (website) {
                    websites.pages.push(page) ;
                    page._website = websiteId
                })
        })
}

function deletePage(pageId) {
    return PageModel
        .findById(pageId)
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

    return PageModel.findById({_id: pageId})
        .then(function (page) {
            var widgets = page.widgets;
            return recursiveDelete(widgets, pageId);
        }, function (err) {
            return err;
        });
}

function recursiveDelete(widgets, pageId) {
    if(widgetsOfPage.length == 0){
        return PageModel.remove({_id: pageId})
            .then(function (response) {
                if(response.result.n == 1 && response.result.ok == 1){
                    return response;
                }
            }, function (err) {
                return err;
            });
    }

    return model.widgetModel.deleteWidgetOfPage(widgetsOfPage.shift())//check widgetModel
        .then(function (response) {
            if(response.result.n == 1 && response.result.ok == 1){
                return recursiveDelete(widgetsOfPage, pageId);
            }
        }, function (err) {
            return err;
        });

}
