/**
 * Created by ch_su_00 on 2/13/2017.
 */
(function () {
    angular
        .module("RestaurantReviewApp")
        .config(configuration);

    function configuration($routeProvider,$httpProvider) {

        $routeProvider

            .when("/home" , {
                templateUrl: 'views/home/templates/home.view.client.html',
                controller: 'HomeController',
                controllerAs: 'model'
            })
            .when('/login',{
                templateUrl : 'views/user/templates/login.view.client.html',
                controller : "LoginController",
                controllerAs : "model"
            })

            .when('/register',{
                templateUrl : "views/user/templates/register.view.client.html",
                controller : "RegisterController",
                controllerAs : "model"
            })

            .when('/admin/:uid',{
                templateUrl : "views/admin/templates/admin.view.client.html",
                controller : "AdminController",
                controllerAs : "model",
                resolve : {
                    checkLogin: checkLogin
                }

            })
            .when('/search/:query',{
                templateUrl : "views/restaurant/templates/restaurant-list.view.client.html",
                controller : "SearchController",
                controllerAs : "model",

            })

            .when('/profile/:uid',{
                templateUrl : "views/user/templates/profile.view.client.html",
                controller : "ProfileController",
                controllerAs : "model",
                resolve : {
                    checkLogin: checkLogin
                }
            })
            .when('/restaurant/:rid',{
                templateUrl : "views/restaurant/templates/restaurant-details.view.client.html",
                controller : "RestaurantController",
                controllerAs : "model"
            })
            .when('/restaurant/:rid/:revid/update',{
                templateUrl : "views/restaurant/templates/restaurant-details-upd.view.client.html",
                controller : "RestaurantController",
                controllerAs : "model"
            })

            .when('/restaurant/:rid/reviews',{
                templateUrl : "views/restaurant/templates/reviews.view.client.html",
                controller : "RestaurantController",
                controllerAs : "model"
            })
            .when('/restaurant/:rid/offers',{
                templateUrl : "views/restaurant/templates/offers.view.client.html",
                controller : "RestaurantController",
                controllerAs : "model"
            })

            .when('/home/:uid',{
                templateUrl : "views/home/templates/home1.view.client.html",
                controller : "HomeController",
                controllerAs : "model",
                resolve : {
                    checkLogin: checkLogin
                }

            })

            .when('/user/:uid/profile',{
                templateUrl : "views/user/templates/other-user.profile.view.client.html",
                controller : "OtherUserController",
                controllerAs : "model",
                resolve : {
                    checkLogin: checkLogin
                }

            })
            .when('/user/:uid',{
                templateUrl : "views/user/templates/update.profile.view.client.html",
                controller : "ProfileController",
                controllerAs : "model",
                resolve : {
                    checkLogin: checkLogin
                }

            })
            .when('/user',{
                templateUrl : "views/user/templates/profile.view.client.html",
                controller : "ProfileController",
                controllerAs : "model"
            })
            .otherwise ({
                redirectTo: "/home"
            });

        function checkLogin($q, UserService, $location) {

            var deferred = $q.defer();

            UserService
                .checkLogin()
                .then(
                    function (user) {

                        if(user != '0') {
                            deferred.resolve();
                        }
                        else {
                            deferred.reject();
                            $location.url("/login");
                        }
                    },function (err) {

                    }
                );

            return deferred.promise;
        }

    }


})();