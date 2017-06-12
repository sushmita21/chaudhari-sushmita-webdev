/**
 * Created by ch_su_000 on 07/06/2017.
 */
var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server')
var widgetModel = mongoose.model('WidgetModel', widgetSchema);
module.exports = widgetModel;

var pageModel = require('../page/page.model.server');

var fs = require("fs");
var publicDirectory =__dirname+"/../../../public";


widgetModel.createWidget= createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.sortWidget = sortWidget;
widgetModel.deleteWidgetOfPage = deleteWidgetOfPage;



function deleteWidgetOfPage(widgetId) {
    return widgetModel.findById(widgetId)
        .then(function (widget) {
            if(widget.type == "IMAGE"){
                deleteUploadedImage(widget.url);
            }
            return widgetModel.remove({_id: widgetId});
        }, function (err) {
            return err;
        });
}

function findWidgetById(widgetId){
    return widgetModel.findById(widgetId).select('-__v');
}

function updateWidget(widgetId, updatedWidget){
    return widgetModel.update({_id:widgetId},{$set: updatedWidget});
}

function deleteWidget(widgetId){
    return widgetModel.findById(widgetId).populate('_page').then(function (widget) {
        widget._page.widgets.splice(widget._page.widgets.indexOf(widgetId),1);
        widget._page.save();
        if(widget.type == "IMAGE"){
            deleteUploadedImage(widget.url);
        }
        return widgetModel.remove({_id:widgetId});
    }, function (err) {
        return err;
    });
}

function createWidget(pageId, newWidget){
    return widgetModel
        .create(newWidget)
        .then(function (widget) {
            return pageModel
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
    console.log(pageId , start ,end);
    return pageModel
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

    return pageModel
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

function getWidgetsRecursively(count, widgetsOfPage, widgetCollectionForPage) {
    if(count == 0){
        return widgetCollectionForPage;
    }

    return widgetModel.findById(widgetsOfPage.shift()).select('-__v')
        .then(function (widget) {
            widgetCollectionForPage.push(widget);
            return getWidgetsRecursively(--count, widgetsOfPage, widgetCollectionForPage);
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