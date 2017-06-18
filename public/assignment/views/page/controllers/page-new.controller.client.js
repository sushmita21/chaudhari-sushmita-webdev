
(function () {

    angular
        .module("WebAppMaker")
        .controller("PageNewController", PageNewController)


    function PageNewController($routeParams, PageService ,$location) {

        var model = this;
        var userId = $routeParams['uid'];
        var websiteId = $routeParams['wid'];
        model.userId = userId;
        model.websiteId = websiteId;

        function init() {
            var promise = PageService.findPageByWebsiteId(websiteId);
            promise.then(function (pages) {
                model.pages = pages;
            })
        }init();



        model.createPage = createPage;

        function createPage(newPage) {
            if(newPage === undefined ||newPage.name === undefined || newPage.name === null || newPage.name === "")
            {
                model.error = "Page Name is required."
            }
            else {
                var promise = PageService.createPage(model.websiteId, newPage);
                promise.then(function (response) {
                    $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page");
                });
            }
        }
    }

}) ();