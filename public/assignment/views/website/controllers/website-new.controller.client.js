(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebsiteNewController)
    function WebsiteNewController($routeParams, WebsiteService ,$location) {

        var model = this;
        var userId = $routeParams['uid'];
        function init() {
            var promise = WebsiteService.findWebsitesByUser(userId);
            promise.then(function()
            {
                model.websites = websites;
            });

        }
        init();
        model.userId = userId;
        model.createWebsite = createWebsite;

        function createWebsite(website) {
            var promise = WebsiteService.createWebsite(model.userId, website);
            promise.then(function()
            {
                $location.url("/user/" + model.userId + "/website");
            });


        }
    }

}) ();