(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebsiteNewController)
    function WebsiteNewController($routeParams, WebsiteService ,$location) {

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
        model.createWebsite = createWebsite;

        function createWebsite(website) {

            if(website === undefined)
            {
                model.error = "Website name is required";

            }
            else if(website.name === undefined || website.name === null || website.name === "" )
            {
                model.error = "Website name is required";
            }
            else{
                var promise = WebsiteService.createWebsite(model.userId, website);
                promise.then(function()
                {
                    $location.url("/user/" + model.userId + "/website");
                });
            }

        }
    }

}) ();