(function () {

    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)


    function WebsiteListController($routeParams, WebsiteService) {
        var model = this;
        var userId = $routeParams['uid'];
        model.userId = userId;
        function init() {
            var promise = WebsiteService.findWebsitesByUser(userId);
            promise.then(function(websites)
            {
                model.websites = websites;
            });

        }
        init();

    }

}) ();