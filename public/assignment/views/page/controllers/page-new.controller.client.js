
(function () {

    angular
        .module("WebAppMaker")
        .controller("PageNewController", PageNewController)


    function PageNewController($routeParams, PageService ,$location) {

        var model = this;
        var userId = $routeParams['uid'];
        var websiteId = $routeParams['wid'];

        function init() {
            var pages = PageService.findPageByWebsiteId(websiteId);
            model.pages = pages;
        }init();


        model.userId = userId;
        model.websiteId = websiteId;

        model.createPage = createPage;

        function createPage(newPage) {
            var page = PageService.createPage(model.websiteId, newPage);
            $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page");
        }
    }

}) ();