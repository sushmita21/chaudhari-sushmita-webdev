/**
 * Created by ch_su_000 on 06/06/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller('FlickrImageSearchController',FlickrImageSearchController);

    function FlickrImageSearchController($routeParams, $location, FlickrService, WidgetService) {
        var model          = this;
        model.uid          = $routeParams.uid;
        model.wid          = $routeParams.wid;
        model.pid          = $routeParams.pid;
        model.wgid         = $routeParams.wgid;
        model.searchPhotos = searchPhotos;
        model.selectPhoto  = selectPhoto;

        function searchPhotos(searchTerm) {
            FlickrService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;
                });
        }

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            WidgetService
                .findWidgetById(model.wgid)
                .then(function (response) {
                    var updatedWidget = response;
                    updatedWidget.url = url;
                    WidgetService
                        .updateWidget(model.wgid, updatedWidget)
                        .then(function (response) {
                            var updatedWidgetObject = response;
                            if (updatedWidgetObject) {
                                $location.url("/user/" + model.uid + "/website/" + model.wid + "/page/" + model.pid + "/widget");
                            }
                        }, function (err) {

                        });
                }, function (err) {

                });
        }
    }
})();