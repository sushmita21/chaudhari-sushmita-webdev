(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController)

    function WebsiteEditController($routeParams, WebsiteService ,$location) {
        var model = this;
        var userId = $routeParams['uid'];
        model.websiteId = $routeParams['wid'];
        function init() {
            model.websites = WebsiteService.findAllWebsitesByUser(model.userId);
            model.website = WebsiteService.findWebsiteById(model.websiteId);
        }
        init();

        model.deleteWebsite = deleteWebsite;
        function deleteWebsite() {
            WebsiteService.deleteWebsite(model.websiteId);
            $location.url("/user/" + model.userId + "/website");
        }

        model.updateWebsite = updateWebsite;
        function updateWebsite(website) {
            var website = WebsiteService.updateWebsite(model.websiteId, website);
            $location.url("user/"+model.userId+"/website");
        }
    }

}) ();