
(function () {

    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)


    function PageListController($routeParams, PageService) {

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
        }
        init();


    }

}) ();