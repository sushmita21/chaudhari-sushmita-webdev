(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController)

    function WebsiteEditController($routeParams, WebsiteService ,$location) {
        var model = this;
        var userId = $routeParams['uid'];
        model.websiteId = $routeParams['wid'];

        function init() {
            var promise = WebsiteService.findAllWebsitesByUser(model.userId);
            promise.then(function(websites)
            {
                model.websites = websites;
            });

            var promise1 = WebsiteService.findWebsiteById(model.websiteId);
            promise.then(function (websites)
            {
                model.websites = websites;
            });

        }
        init();

        model.deleteWebsite = deleteWebsite;
        function deleteWebsite() {
            var promise = WebsiteService.deleteWebsite(model.websiteId);
            promise.then(function(website)
            {
                $location.url("/user/" + model.userId +"/website");

            });

        }

        model.updateWebsite = updateWebsite;
        function updateWebsite(website) {
            var promise = WebsiteService.updateWebsite(model.websiteId, website);
            promise.then(function(website)
            {
                $location.url("user/"+model.userId+"/website");
            });

        }
    }

}) ();