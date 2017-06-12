(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController)

    function WebsiteEditController($routeParams, WebsiteService ,$location) {
        var model = this;
        model.userId = $routeParams['uid'];
        model.websiteId = $routeParams['wid'];

        function init() {
            var promise = WebsiteService.findWebsitesByUser(model.userId);
            promise.then(function(websites)
            {
                model.websites = websites;
            });

            var promise = WebsiteService.findWebsiteById(model.websiteId);
            promise.then(function (website)
            {
                model.website = website;
            });

        }
        init();


        model.updateWebsite = updateWebsite;
        model.deleteWebsite = deleteWebsite;

        function deleteWebsite() {
            var promise = WebsiteService.deleteWebsite(model.websiteId);
            promise.then(function(website)
            {
                $location.url("/user/" + model.userId +"/website");

            });

        }


        function updateWebsite(website) {
            var promise = WebsiteService.updateWebsite(model.websiteId, website);
            promise.then(function(website)
            {
                $location.url("user/"+model.userId+"/website");
            });

        }
    }

}) ();