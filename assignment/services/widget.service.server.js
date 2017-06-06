/**
 * Created by ch_su_000 on 01/06/2017.
 */
var app = require("../../express");
var multer = require('multer');
var upload = multer({ dest: __dirname+'/../../public/uploads' });




var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "Franz Kafka"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Follor your most intense obsessions mercilessly."},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Author Franz Kafka explored the human struggle for understanding and security in his novels such as Amerika, The Trial and The Castle. Born on July 3, 1883, in Prague, capital of what is now the Czech Republic, writer Franz Kafka grew up in an upper middle-class Jewish family.</p>"},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Franz Kafka"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/g4LyzhkDNBM" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>After studying law at the University of Prague, he worked in insurance and wrote in the evenings. In 1923, he moved to Berlin to focus on writing, but died of tuberculosis shortly after. His friend Max Brod published most of his work posthumously, such as <em>Amerika</em> and <em>The Castle</em>.</p>"}
    ];



app.post("/api/page/:pageId/widget/", createWidget);
app.get("/api/page/:pageId/widget", findWidgetByPageId);
app.get("/api/widget/:widgetId/", findWidgetById);
app.put("/api/widget/:widgetId/", updateWidget);
app.delete("/api/widget/:widgetId", deleteWidget);
app.post ("/api/upload", upload.single('myFile'), uploadImage);

function createWidget(req, res)
{
    var pageId = req.params.pageId;
    var widget = req.body;
    var widgetLength = widgets.length;
    var lastWidgetId = widgets[widgetLength-1]._id;
    var newWidgetId = (parseInt(lastWidgetId) + 1).toString();
    var sortedWidgetList = widgets.filter(function (w) {
        return w.pageId = pageId;
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
                text: widget.text};
            break;
        case "HTML":
            newWidget = {
                _id: newWidgetId,
                widgetType: widget.type,
                pageId: pageId,
                text: widget.text};
            break;
        case "IMAGE":
            newWidget = {
                _id: newWidgetId,
                widgetType: widget.type,
                pageId: pageId,
                width: widget.width,
                url: widget.url};
            break;
        case "YOUTUBE":
            newWidget = {
                _id: newWidgetId,
                widgetType: widget.type,
                pageId: pageId,
                width: widget.width,
                url: widget.url};
            break;
    }

    widgets.push(newWidget);
    res.json(newWidget);
}

function findWidgetByPageId(req, res)
{
    var widgetList = [];
    var pageId = req.params.pageId;
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
    // return widgetList;
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
    res.sendStatus(400);
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
    res.sendStatus(400);
    //return "UnableToDeleteWidget";

}

function updateIndices() {
    
}