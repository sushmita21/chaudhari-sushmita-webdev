(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController);

    function WidgetEditController($routeParams, WidgetService , $location) {
        var model = this;
        model.userId = $routeParams.uid;
        model.websiteId = $routeParams.wid;
        model.pageId = $routeParams.pid;
        model.widgetId = $routeParams.wgid;

        function init() {
            model.widget = WidgetService.findWidgetById(model.widgetId);
        }init();

        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;

        function updateWidget(updatedWidget) {
            WidgetService.updateWidget(model.widgetId, updatedWidget);
            $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget");
        }
        function deleteWidget(wgid) {
            var deleteResult = WidgetService.deleteWidget(wgid);
            $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget");

        }
    }
})();