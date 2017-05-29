(function () {
    angular
        .module("WebAppMaker")
        .controller("PageEditController", PageEditController)


    function PageEditController($routeParams, PageService ,$location) {

        var model = this;
        var userId = $routeParams['uid'];
        model.websiteId = $routeParams['wid'];
        model.pageId = $routeParams['pid'];

        function init() {
            model.page = PageService.findPageById(model.pageId);
            model.pages = PageService.findPageByWebsiteId(model.websiteId);
        }init();

        model.userId = userId;

        model.deletePage = deletePage;
        model.updatePage = updatePage;



        function deletePage() {
            PageService.deletePage(model.pageId);
            $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page");
        }


        function updatePage(page) {

            var page = PageService.updatePage(model.pageId, page);
            $location.url("user/" + model.userId + "/website/" + model.websiteId + "/page");

        }
    }

}) ();