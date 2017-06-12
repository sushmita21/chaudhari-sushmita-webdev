(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetNewController", WidgetNewController);


    function WidgetNewController($routeParams, $location, WidgetService) {
        var model = this;
        model.userId = $routeParams.uid;
        model.websiteId = $routeParams.wid;
        model.pageId = $routeParams.pid;

        model.createHeaderWidget = createHeaderWidget;
        model.createHTMLWidget = createHTMLWidget;
        model.createImageWidget = createImageWidget;
        model.createYoutubeWidget = createYoutubeWidget;
        model.createTextWidget = createTextWidget;

        function createHeaderWidget(headerSize) {
            var widget =
                {
                    type: "HEADER",
                    size: headerSize.toString(),
                    text: "Heading "+headerSize
                }
            var promise = WidgetService.createWidget(model.pageId, widget);
            promise.then(function(result)
            {
                var newWidget = result;
                $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget/" + newWidget._id);
            });

        }
        function createHTMLWidget() {
            var widget =
                {type: "HTML",
                    text: "Sample <i>HTML</i> text"};

            var promise= WidgetService.createWidget(model.pageId, widget);
            promise.then(function(result)
            {
                var newWidget = result;
                $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget/" + newWidget._id);
            });
        }

        function createImageWidget() {
            var widget =
                {type: "IMAGE",
                    width: "100%",
                    url: "https://www.srf.ch/static/radio/modules/dynimages/624/srf-2/hoerspiel/2013/171120.14129704.jpg"}

            var promise = WidgetService.createWidget(model.pageId, widget);
            promise.then(function(result)
            {
                var newWidget = result;
                $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget/" + newWidget._id);
            });

        }

        function createYoutubeWidget() {
            var widget =
                {
                    type: "YOUTUBE",
                    width: "100%",
                    url: "https://www.youtube.com/embed/g4LyzhkDNBM"
                }

            var promise = WidgetService.createWidget(model.pageId, widget);
            promise.then(function (result) {
                var newWidget = result;
                $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget/" + newWidget._id);
            });
        }


        function createTextWidget() {
            var widget = {  type: "TEXT",
                text: "Sample text",
                rows: 1,
                placeholder: "Enter some text",
                formatted: false};
            WidgetService
                .createWidget(model.pageId, widget)
                .then(function (response) {
                    var newWidget = response;
                    if(newWidget){
                        $location.url("/user/"+model.userId+"/website/"+model.websiteId+"/page/"+model.pageId+"/widget/"+newWidget._id);
                    }
                });
        }
    }
})();