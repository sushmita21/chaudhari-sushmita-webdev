
(function () {
    angular
        .module("WebAppMaker")
        .service("PageService", PageService);

    function PageService() {
        var pages = [
                { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
                { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
                { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
            ];

        var api={

            "createPage":createPage,
            "findPageByWebsiteId":findPageByWebsiteId,
            "findPageById":findPageById,
            "updatePage":updatePage,
            "deletePage":deletePage
        };

        return api;

        function createPage(wid, newPage) {
            var len = pages.length;
            var lastId = pages[len - 1]._id;
            var newId = parseInt(lastId) + 1;

            var pid = newId.toString();

            var page =
                {
                _id: pid,
                name: newPage.name,
                websiteId: wid,
                description: newPage.description
                };
            pages.push(page);
            return page;
        }

        function findPageByWebsiteId(wid) {
            var pageList = [];
            for(var p in pages){
                if(pages[p].websiteId === wid){
                    pageList.push(pages[p]);
                }
            }
            return pageList;
        }

        function findPageById(pid) {
            for(var p in pages){
                if(pages[p]._id === pid){
                    return pages[p];
                }
            }
            return null;
        }
        function updatePage(pid, updatedPage) {
            for(var p in pages) {
                var page = pages[p];
                if( page._id === pid) {
                    pages[p].name = updatedPage.name;
                    pages[p].description = updatedPage.description;
                    return page;
                }
            }
            return null;
        }
        function deletePage(pid) {
            for(var p in pages) {
                var page = pages[p];
                if( page._id === pid) {
                    pages.splice(p,1);
                    return "PageDeletedSucessfully";
                }
            }
            return "PageNotDeleted";
        }
        




    }
})();