/**
 * Created by ch_su_00 on 6/5/2017.
 */

(function (){

    angular
        .module("RestaurantReviewApp")
        .controller("HomeController" ,HomeController);


    function HomeController($routeParams,$location,UserService){
        var vm = this;
        vm.search = search;
        vm.logout = logout;
        function init() {



            var promise = UserService.findCurrentUser();

            promise
                .then(function(user){
                    if(user != '0'){
                        vm.user = user;
                    }
                },function (err) {

                })
        }
        init();

        function search(query){
            $location.url('/search/'+query);
        }

        function logout(){
            UserService.logout()
                .then(function(){
                    $location.url("/login");
                },function (err) {
                    
                });
        }
    }

})();

