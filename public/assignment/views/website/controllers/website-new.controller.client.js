(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebsiteNewController)
    function WebsiteNewController($routeParams, WebsiteService ,$location) {

        var model = this;
        var userId = $routeParams['uid'];
        function init() {
            var websites = WebsiteService.findWebsitesByUser(userId);
            model.websites = websites;
        }
        init();
        model.userId = userId;
        model.createWebsite = createWebsite;

        function createWebsite(website) {
            var website = WebsiteService.createWebsite(model.userId, website);
            $location.url("/user/" + model.userId + "/website");
        }
    }

}) ();