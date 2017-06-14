/**
 * Created by Sushmita on 6/5/2017.
 */

(function (){

    angular
        .module("FoodApp")
        .controller("HomeController" ,HomeController);


    function HomeController($routeParams,$location,UserService){
        var vm = this;
        vm.search = search;
        function init() {
        }
        init();

        function search(query){
            $location.url('/search/'+query);
        }

    }

})();

