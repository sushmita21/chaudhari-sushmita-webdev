/**
 * Created by ch_su_000 on 01/06/2017.
 */
var app = require("../../express");
var widgetModel = require('../model/widget/widget.model.server');
var multer = require('multer');
var fs = require('fs');
var upload = multer({ dest: __dirname+'/../../public/uploads' });

app.post("/api/page/:pageId/widget/", createWidget);
app.get("/api/page/:pageId/widget", findWidgetByPageId);
app.get("/api/widget/:widgetId/", findWidgetById);
app.put("/api/widget/:widgetId/", updateWidget);
app.delete("/api/widget/:widgetId", deleteWidget);
app.put("/page/:pageId/widget", sortWidget);
app.post ("/assignment/api/upload", upload.single('myFile'), uploadImage);



/*
 var widgets = [
 { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "Franz Kafka", index: 2},
 { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Follor your most intense obsessions mercilessly.", index:3},
 { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
 "url": "http://lorempixel.com/400/200/", index:5},
 { "_id": "456", "widgetType": "HTML", "pageId": "321", "text":
 "<p>Author Franz Kafka explored the human struggle for understanding and security in his novels such as Amerika, " +
 "The Trial and The Castle. Born on July 3, 1883, in Prague, capital of what is now the Czech Republic, writer Franz " +
 "Kafka grew up in an upper middle-class Jewish family.</p>", index: 6},
 { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Franz Kafka", index:1},
 { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
 "url": "https://youtu.be/g4LyzhkDNBM", index:0},
 { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>After studying law at the University of Prague, he worked in insurance and wrote in the evenings. In 1923, he moved to Berlin to focus on writing, but died of tuberculosis shortly after. His friend Max Brod published most of his work posthumously, such as <em>Amerika</em> and <em>The Castle</em>.</p>", index:4}
 ];
 */


function createWidget(req, res)
{
    var pageId = req.params.pageId;
    var widget = req.body;
    console.log(widget);
    var newWidget = {};

    switch (widget.type){
        case "HEADER":
            newWidget = {
                type: widget.type,
                size: widget.size,
                text: widget.text};
            break;
        case "HTML":
            newWidget = {
                type: widget.type,
                text: widget.text};
            break;
        case "IMAGE":
            newWidget = {
                type: widget.type,
                width: widget.width,
                url: widget.url};
            break;
        case "YOUTUBE":
            newWidget = {
                type: widget.type,
                width: widget.width,
                url: widget.url};
            break;
        case "TEXT":
            newWidget = {
                type: widget.type,
                text: widget.text,
                rows: widget.rows,
                placeholder: widget.placeholder,
                formatted: widget.formatted};
            break;
    }

    widgetModel
        .createWidget(pageId, newWidget)
        .then(function (widget) {
            res.json(widget);
        }, function (err) {
            res.sendStatus(404);
        });
    //
    //
    //
    /*var pageId = req.params.pageId;
     var widget = req.body;
     var widgetLength = widgets.length;
     var lastWidgetId = widgets[widgetLength-1]._id;
     var newWidgetId = (parseInt(lastWidgetId) + 1).toString();
     var sortedWidgetList = widgets.filter(function (w) {
     return w.pageId == pageId;
     })
     .sort(function(a, b)
     {
     return a.index < b.index;
     });
     var currenthighestIndex = 0;
     if(sortedWidgetList.length != 0)
     {
     currenthighestIndex = sortedWidgetList[0].index + 1;
     }
     var newIndex = currenthighestIndex;
     var newWidget;
     switch (widget.type){
     case "HEADER":
     newWidget = {
     _id: newWidgetId,
     widgetType: widget.type,
     pageId: pageId,
     size: widget.size,
     text: widget.text,
     index: newIndex};
     break;
     case "HTML":
     newWidget = {
     _id: newWidgetId,
     widgetType: widget.type,
     pageId: pageId,
     text: widget.text,
     index: newIndex};
     break;
     case "IMAGE":
     newWidget = {
     _id: newWidgetId,
     widgetType: widget.type,
     pageId: pageId,
     width: widget.width,
     url: widget.url,
     index: newIndex};
     break;
     case "YOUTUBE":
     newWidget = {
     _id: newWidgetId,
     widgetType: widget.type,
     pageId: pageId,
     width: widget.width,
     url: widget.url,
     index: newIndex};
     break;
     }
     widgets.push(newWidget);
     res.json(newWidget);*/
}

function findWidgetByPageId(req, res)
{
    //var widgetList = [];
    var pageId = req.params.pageId;
    widgetModel
        .findAllWidgetsForPage(pageId)
        .then(function (widgets) {
            res.json(widgets);
        }, function (err) {
            res.sendStatus(404);
        });

}

function findWidgetById(req, res) {

    var widgetId = req.params.widgetId;

    widgetModel
        .findWidgetById(widgetId)
        .then(function (widget) {
            console.log("success");
            console.log(widget);
            res.json(widget);
        }, function (err) {
            res.sendStatus(404);
        });
}

function updateWidget(req, res)
{
    var widgetId = req.params.widgetId;
    var updatedWidget = req.body;
    widgetModel
        .updateWidget(widgetId, updatedWidget)
        .then(function (response) {
            if(response.ok === 1 && response.n === 1){
                res.sendStatus(200);
            }
            else{
                res.sendStatus(404);
            }
        }, function (err) {
            res.sendStatus(404);
        });

}

function deleteWidget(req, res)
{
    var widgetId = req.params.widgetId;
    widgetModel
        .deleteWidget(widgetId)
        .then(function (response) {
            if(response.result.n == 1 && response.result.ok == 1){
                res.sendStatus(200);
            }
        }, function (err) {
            res.sendStatus(404);
        });

}

function updateIndices(deletedIndex, deletedWPageId) {
    var updateWidgets = widgets.filter(function (w) {
        return w.pageId == deletedWPageId;

    });
    var widgetUpdateIndex = updateWidgets.filter(function (w) {
        return w.index > deletedIndex;

    })
    if(widgetUpdateIndex)
    {
        widgetUpdateIndex.map(function(widget)
        {
            widget.index--;
        })
    }

}

function sortWidget(req, res)
{
    var pageId = req.params.pageId;
    var startIndex = parseInt(req.query.initial);
    var endIndex = parseInt(req.query.final);

    widgetModel
        .sortWidget(pageId, startIndex, endIndex)
        .then(function (response) {
            res.sendStatus(response);
        }, function (err) {
            res.sendStatus(404);
        });



    /*var pageId = req.params.pageId;
     var startIndex = parseInt(req.query.initial);
     var endIndex = parseInt(req.query.final);
     var widgetList = widgets.filter(function (currentWidget) {
     return currentWidget.pageId === pageId;
     })
     var startWidget = widgetList.find(function (currentWidget) {
     return currentWidget.index === startIndex;
     })
     var endWidget = widgetList.find(function (currentWidget) {
     return currentWidget.index === endIndex;
     })
     startWidget.index = endIndex;
     if(startIndex < endIndex){
     widgetList.filter(function (currentWidget) {
     return currentWidget.index > startIndex && currentWidget.index < endIndex;
     }).map(function (currentWidget) {
     currentWidget.index -= 1;
     });
     endWidget.index -=1;
     }
     else {
     widgetList.filter(function (currentWidget) {
     return currentWidget.index < startIndex && currentWidget.index > endIndex;
     }).map(function (currentWidget) {
     currentWidget.index += 1;
     });
     endWidget.index +=1;
     }
     res.sendStatus(200);*/
}


function uploadImage(req, res) {

    var widgetId = req.body.widgetId;
    var uid = req.body.uid;
    var wid = req.body.wid;
    var pid = req.body.pid;
    var myFile = req.file;


    var imgWidget = {
        width: req.body.width,
        _id:widgetId
    };

    if(myFile){
        if(imgWidget.url){

            fs.unlink(uploadsFolderPath + "/" + imgWidget["fileName"], function () {
            });
        }

        console.log(myFile);
        imgWidget["fileName"] = myFile.filename;
        imgWidget.url = req.protocol + '://' + req.get('host') + "/uploads/" + myFile.filename;

        widgetModel
            .updateWidget(widgetId, imgWidget)
            .then(function (response) {
                if(response.ok === 1 && response.n === 1){
                    res.redirect("/assignment/#/user/"+uid+"/website/"+wid+"/page/"+pid+"/widget");
                }
                else{
                    res.sendStatus(404);
                }
            }, function (err) {
                res.sendStatus(404);
            });
    }
    else{

        res.redirect("/assignment/#/user/"+uid+"/website/"+wid+"/page/"+pid+"/widget");
    }
}