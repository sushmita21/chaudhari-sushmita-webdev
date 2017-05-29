
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

        function createHeaderWidget(headerSize) {
            var widget =
                {
                type: "HEADER",
                size: headerSize.toString(),
                text: "Heading "+headerSize
            }

            var newWidget = WidgetService.createWidget(model.pageId, widget);
            $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget/" + newWidget._id);
        }
        function createHTMLWidget() {
            var widget =
                {type: "HTML",
                text: "Sample <i>HTML</i> text"};
            var newWidget = WidgetService.createWidget(model.pageId, widget);
            $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget/" + newWidget._id);

        }

        function createImageWidget() {
            var widget =
                {type: "IMAGE",
                width: "100%",
                url: "https://www.srf.ch/static/radio/modules/dynimages/624/srf-2/hoerspiel/2013/171120.14129704.jpg"}
            var newWidget = WidgetService.createWidget(model.pageId, widget);
            $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget/" + newWidget._id);
        }

        function createYoutubeWidget() {
            var widget =
                {type: "YOUTUBE",
                width: "100%",
                url: "https://www.youtube.com/embed/g4LyzhkDNBM"}
            var newWidget = WidgetService.createWidget(model.pageId, widget);
            $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget/" + newWidget._id);

        }
    }
})();