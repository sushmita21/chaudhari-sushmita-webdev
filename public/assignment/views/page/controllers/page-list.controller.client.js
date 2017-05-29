
(function () {

    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)


    function PageListController($routeParams, PageService) {

        var model = this;
        var userId = $routeParams['uid'];
        var websiteId = $routeParams['wid'];
        function init() {
            var pages = PageService.findPageByWebsiteId(websiteId);
            model.pages = pages;
        }
        init();

        model.userId = userId;
        model.websiteId = websiteId;

    }

}) ();