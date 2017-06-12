(function () {
    angular
        .module("WebAppMaker")
        .service("WidgetService", WidgetService);

    function WidgetService($http) {

        /*var widgets = [
         { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "Franz Kafka"},
         { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Follor your most intense obsessions mercilessly."},
         { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
         "url": "http://lorempixel.com/400/200/"},
         { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Author Franz Kafka explored the human struggle for understanding and security in his novels such as Amerika, The Trial and The Castle. Born on July 3, 1883, in Prague, capital of what is now the Czech Republic, writer Franz Kafka grew up in an upper middle-class Jewish family.</p>"},
         { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Franz Kafka"},
         { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
         "url": "https://youtu.be/g4LyzhkDNBM" },
         { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>After studying law at the University of Prague, he worked in insurance and wrote in the evenings. In 1923, he moved to Berlin to focus on writing, but died of tuberculosis shortly after. His friend Max Brod published most of his work posthumously, such as <em>Amerika</em> and <em>The Castle</em>.</p>"}
         ]
         ;
         */

        var api={
            "findWidgetById":findWidgetById,
            "deleteWidget":deleteWidget,
            "createWidget":createWidget,
            "findWidgetsByPageId":findWidgetByPageId,
            "updateWidget":updateWidget,
            "sortWidget":sortWidget
        };

        return api;

        function findWidgetById(widgetId) {
            var url ="/api/widget/"+widgetId;
            return $http.get(url)
                .then(function (response)
                {
                    return response.data;
                });

            /*for(var w in widgets) {
             if(widgets[w]._id === widgetId) {
             return widgets[w];
             }
             }
             return null;
             */
        }

        function deleteWidget(widgetId) {
            var url ="/api/widget/"+widgetId;
            return $http.delete(url)
                .then(function (response)
                {
                    return response.data;
                });

            /*for(var w in widgets) {
             var widget = widgets[w];
             if( widget._id === widgetId ) {
             widgets.splice(w,1);
             return "WidgetDeleted";
             }
             }
             */
            /*return "UnableToDeleteWidget";*/
        }

        function findWidgetByPageId(pageId) {
            var url ="/api/page/"+pageId+"/widget";
            return $http.get(url)
                .then(function (response)
                {
                    return response.data;
                });

            /*var widgetList = [];
             for(var w in widgets){
             if(widgets[w].pageId === pageId){
             var widget = widgets[w];
             widgetList.push(widget);
             }
             }
             return widgetList;*/
        }

        function createWidget(pageId, widget) {
            console.log("create widget");
            console.log(widget);
            var url ="/api/page/"+pageId+"/widget";
            return $http.post(url, widget)
                .then(function (response)
                {
                    return response.data;
                });

            /*var len = widgets.length;
             var lastWidgetId = widgets[len - 1]._id;
             var newId = parseInt(lastWidgetId) + 1;
             var newWidgetId = newId.toString();
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
             return newWidget;*/
        }

        function updateWidget(widgetId, updatedWidget) {
            var url ="/api/widget/"+widgetId;
            return $http.put(url, updatedWidget)
                .then(function (response)
                {
                    return response.data;
                });


            /*for(var w in widgets) {
             var widget = widgets[w];
             if( widget._id === widgetId) {
             widgets[w] = updatedWidget;
             return widget;
             }
             }
             return null;*/
        }
        function sortWidget(pageId, startIndex, endIndex) {
            var url = "/page/"+pageId+"/widget?initial="+startIndex+"&final="+endIndex;
            return $http.put(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();