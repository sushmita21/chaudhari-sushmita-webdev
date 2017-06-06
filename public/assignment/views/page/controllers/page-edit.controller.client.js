(function () {
    angular
        .module("WebAppMaker")
        .controller("PageEditController", PageEditController)


    function PageEditController($routeParams, PageService ,$location) {

        var model = this;
        var userId = $routeParams['uid'];
        model.websiteId = $routeParams['wid'];
        model.pageId = $routeParams['pid'];
        model.userId = userId;

        function init() {

            var promise = PageService.findPageById(model.pageId);
            promise.then(function (page) {
                model.page = page;
            });
            var promise = PageService.findPageByWebsiteId(model.websiteId);
            promise.then(function (pages) {
                model.pages = pages;
            });
        }init();



        model.deletePage = deletePage;
        model.updatePage = updatePage;



        function deletePage() {
            var promise = PageService.deletePage(model.pageId);
            promise.then(function (response) {
                $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page");
            })
        }


        function updatePage(page) {
            var promise = PageService.updatePage(model.pageId, page);
            promise.then(function (response) {
                $location.url("user/" + model.userId + "/website/" + model.websiteId + "/page");
            })
        }
    }

}) ();