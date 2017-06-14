/**
 * Created by Sushmita on 6/5/2017.
 */

(function (){

    angular
        .module("FoodApp")
        .controller("RegisterController" ,RegisterController);



    function RegisterController($location,UserService) {
        var vm = this;
        vm.register = register;

        function register(user){
            console.log(user);
            if( vm.user.password == vm.user.verifyPassword){

                UserService.register(user)
                    .then(function(user){
                        console.log("successs");
                        $location.url("/home/"+ user._id);
                    });
            }else{
                vm.alert = "Password and verify password do not match";
            }

        }


    }

})();

