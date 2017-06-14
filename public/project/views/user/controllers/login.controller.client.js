/**
 * Created by Sushmita on 6/5/2017.
 */

(function (){

    angular
        .module("FoodApp")
        .controller("LoginController" ,LoginController);


    function LoginController($location,$rootScope,$scope,UserService) {
        var vm = this;
        vm.login = login;

        function login(username,password){
            if(!$scope.login.$invalid){

                var promise = UserService.login(username,password);
                promise
                    .then(function(user){
                        if(user === '0'){
                            vm.alert = "User Not Found";
                        }
                        else{
                            $rootScope.currentUser = user;
                            vm.user = user;
                            $location.url("/home/" + user._id);
                        }
                    },
                    function(err){
                        vm.alert = "User Not Found";
                    });
            }
        }
    }

})();

