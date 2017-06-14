/**
 * Created by sushmita on 2/13/2017.
 */
(function () {
    angular
        .module("FoodApp")
        .config(configuration);

    function configuration($routeProvider) {

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

            .when('/search/:query',{
                templateUrl : "views/restaurant/templates/restaurant-list.view.client.html",
                controller : "SearchController",
                controllerAs : "model",

            })

            .when('/profile/:uid',{
                templateUrl : "views/user/templates/profile.view.client.html",
                controller : "ProfileController",
                controllerAs : "model",

            })
            .when('/restaurant/:rid',{
                templateUrl : "views/restaurant/templates/restaurant-details.view.client.html",
                controller : "RestaurantController",
                controllerAs : "model"
            })
            .when('/home/:uid',{
                templateUrl : "views/home/templates/home1.view.client.html",
                controller : "HomeController",
                controllerAs : "model",

            })
            .when('/user/:uid/profile',{
                templateUrl : "views/user/templates/other-user.profile.view.client.html",
                controller : "OtherUserController",
                controllerAs : "model",

            })
            .when('/user/:uid',{
                templateUrl : "views/user/templates/update.profile.view.client.html",
                controller : "ProfileController",
                controllerAs : "model",

            })
            .when('/user',{
                templateUrl : "views/user/templates/profile.view.client.html",
                controller : "ProfileController",
                controllerAs : "model"
            })
            .otherwise ({
                redirectTo: "/home"
            });
    }


})();