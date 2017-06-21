/**
 * Created by ch_su_00 on 6/5/2017.
 */

(function (){

    angular
        .module("FoodApp")
        .controller("HomeController" ,HomeController);


    function HomeController($routeParams,$location,UserService){
        var vm = this;
        vm.search = search;
        vm.logout = logout;
        function init() {



            var promise = UserService.findCurrentUser();

            promise
                .success(function(user){
                    if(user != '0'){
                        //console.log(user);
                        vm.user = user;


                    }
                })
                .error(function(){

                });
        }
        init();

        function search(query){
            $location.url('/search/'+query);
        }

        function logout(){
            UserService.logout()
                .success(function(){
                    $location.url("/login");
                });
        }
    }

})();

