/**
 * Created by ch_su_000 on 01/06/2017.
 */
var app = require("../../express");
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


function createWidget(req, res)
{
    var pageId = req.params.pageId;
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
    res.json(newWidget);
}

function findWidgetByPageId(req, res)
{
    var widgetList = [];
    var pageId = req.params.pageId;
    console.log(pageId);
    for(var w in widgets){
        if(widgets[w].pageId === pageId){
            widgetList.push(widgets[w]);
        }
    }
    var sortedWidgetList = widgetList.sort(
        function (a, b) {
            return a.index > b.index;
        }
    );
    res.json(widgetList);
}

function findWidgetById(req, res) {

     var widgetId = req.params.widgetId;
    for(var w in widgets) {
        if(widgets[w]._id === widgetId) {
            res.json(widgets[w]);
            return;
        }
    }
    res.sendStatus(404);
}

function updateWidget(req, res)
{
    var widgetId = req.params.widgetId;
    var updatedWidget = req.body;
    for(var w in widgets) {
        var widget = widgets[w];
        if( widget._id === widgetId) {
            widgets[w] = updatedWidget;
            res.json(widget);
            return;
        }
    }
    res.sendStatus(404);
}

function deleteWidget(req, res)
{
    var widgetId = req.params.widgetId;
    for(var w in widgets) {
        var widget = widgets[w];
        if( widget._id === widgetId ) {
            lastIndex = widget.index;
            lastPageId = widget.pageId;
            widgets.splice(w,1);
            updateIndices(lastIndex, lastPageId);
            res.sendStatus(200);
            return;
            //return "WidgetDeleted";
        }
    }
    res.sendStatus(404);
    //return "UnableToDeleteWidget";

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
    res.sendStatus(200);
}

function uploadImage(req, res) {
    var widgetId = req.body.widgetId;
    var uid = req.body.uid;
    var wid = req.body.wid;
    var myFile = req.file;
    imgWidget = widgets.find(function (id) {
        return id._id == widgetId;
    });
    if (imgWidget.url) {
        fs.unlink(__dirname + '/../../public/uploads' + "/" + imgWidget["fileName"], function () {
        });
    }
    imgWidget.url = req.protocol + '://' + req.get('host') + "/uploads/" + myFile.filename;
    imgWidget["fileName"] = myFile.filename;
    res.redirect(req.get('referrer') + "#/user/" + uid + "/website/" + wid + "/page/" + imgWidget.pageId + "/widget");
}