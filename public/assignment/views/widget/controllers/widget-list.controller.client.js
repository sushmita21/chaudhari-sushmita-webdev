
(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($sce, $routeParams, WidgetService) {
        var model = this;
        model.userId = $routeParams.uid;
        model.websiteId = $routeParams.wid;
        model.pageId = $routeParams.pid;

        function init() {
            var promise = WidgetService.findWidgetsByPageId(model.pageId);
            promise.then(function (widgets) {
                model.widgets  = widgets;
            },function (error) {
            })
        }init();

        model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        model.getTrustedHtml = getTrustedHtml;



        function getTrustedHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function getYouTubeEmbedUrl(widgetUrl) {
            var urlParts = widgetUrl.split('/');
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/"+id;
            return $sce.trustAsResourceUrl(url);
        }
    }
})();