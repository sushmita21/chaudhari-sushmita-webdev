/**
 * Created by ch_su_000 on 07/06/2017.
 */
var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server')
var widgetModel = mongoose.model('WidgetModel', widgetSchema);
var fs = require("fs");
var publicDirectory =__dirname+"/../../../public";

module.exports = widgetModel;

widgetModel.createWidget= createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.sortWidget = sortWidget;


function findWidgetById(widgetId){
    return WidgetModel.findById(widgetId).select('-__v');
}

function updateWidget(widgetId, updatedWidget){
    return WidgetModel.update({_id:widgetId},{$set: updatedWidget});
}

function deleteWidget(widgetId){
    return WidgetModel.findById(widgetId).populate('_page').then(function (widget) {
        widget._page.widgets.splice(widget._page.widgets.indexOf(widgetId),1);
        widget._page.save();
        if(widget.type == "IMAGE"){
            deleteUploadedImage(widget.url);
        }
        return WidgetModel.remove({_id:widgetId});
    }, function (err) {
        return err;
    });
}

function createWidget(pageId, newWidget){
    return WidgetModel
        .create(newWidget)
        .then(function (widget) {
            return model
                .PageModel
                .findPageById(pageId)
                .then(function (page) {
                    widget._page = page._id;
                    page.widgets.push(widget._id);
                    widget.save();
                    page.save();
                    return widget;
                }, function (err) {
                    return err;
                });
        }, function (err) {
            return err;
        });
}

function sortWidget(pageId, start, end) {
    return model.pageModel
        .findPageById(pageId)
        .then(function (page) {
            page.widgets.splice(end, 0, page.widgets.splice(start, 1)[0]);
            page.save();
            return 200;
        }, function (err) {
            return err;
        });
}

function findAllWidgetsForPage(pageId){

    return model.pageModel
        .findPageById(pageId)
        .then(function (page) {
            var widgetsOfPage = page.widgets;
            var numberOfWidgets = widgetsOfPage.length;
            var widgetCollectionForPage = [];

            return getWidgetsRecursively(numberOfWidgets, widgetsOfPage, widgetCollectionForPage);
        }, function (err) {
            return err;
        });
}

function deleteUploadedImage(imageUrl) {

    if(imageUrl && imageUrl.search('http') == -1){
        fs.unlink(publicDirectory+imageUrl, function (err) {
            if(err){
                console.log(err);
                return;
            }
        });
    }
}