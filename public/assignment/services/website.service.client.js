
(function () {
    angular
        .module("WebAppMaker")
        .service("WebsiteService", WebsiteService);

    function WebsiteService($http) {
        var websites = [
                { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
                { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
                { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
                { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
                { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
                { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
                { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
            ]
        ;

        var api={
            "findWebsitesByUser":findWebsitesByUser,
            "createWebsite":createWebsite,
            "deleteWebsite":deleteWebsite,
            "findWebsiteById":findWebsiteById,
            "updateWebsite":updateWebsite
        };

        return api;
        
        function findWebsitesByUser(userId) {
            var url = "/api/user/"+userId +"/website";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });

            /*var listSites = [];
            for(var w in websites){
                if(websites[w].developerId === userId){
                    listSites.push(websites[w]);
                }
            }
            return listSites;
            */
        }


        function createWebsite(userId , website) {
            var url = "/api/user/"+userId +"/website";
            return $http.post(url, websiteId)
                .then(function (response) {
                    return response.data;
                });
            /*var len =websites.length -1;
            var  lastWebsite = websites[len]._id;
            var wid = parseInt(lastWebsite) + 1
            var newWebsite = {_id: wid.toString(),
                name: website.name,
                developerId: userId,
                description: website.description};
            websites.push(newWebsite);
            return newWebsite;*/
        }

        function deleteWebsite(websiteId) {
            var url = "/api/website";
            return $http.delete(url, websiteId)
                .then(function (response) {
                    return response.data;
                });


          /*  for(var w in websites) {

                if(websites[w]._id === websiteId){
                    websites.splice(w ,1);
                    return "WebsiteDeleted";
                }

            }
            return "WebsiteNotFound";*/
        }

        function findWebsiteById(wid) {
            var url = "/api/website/"+wid;
            return $http.get(url, websiteId)
                .then(function (response) {
                    return response.data;
                });
            /*for(var w in websites){
                if(websites[w]._id === wid){
                    return websites[w];
                }
            }
            return null;*/
        }


        function updateWebsite(wid ,updatedWebsite) {
            var url ="/api/website/"+wid +updatedWebsite;
            return $http.put(url).then(function (response)
            {
                return respose.data;
            });


            /*for(var w in websites) {
                var website = websites[w];
                if( website._id === wid ) {
                    websites[w].name = updWebsite.name;
                    websites[w].description = updWebsite.description;
                    return website;
                }
            }
            return null;*/
        }


    }
})();