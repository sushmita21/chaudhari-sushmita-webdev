(function () {

    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)


    function WebsiteListController($routeParams, WebsiteService) {


        var model = this;
        var userId = $routeParams['uid'];

        function init() {
            var websites = WebsiteService.findWebsitesByUser(userId);
            model.websites = websites;
        }
        init();
        model.userId = userId;
    }

}) ();