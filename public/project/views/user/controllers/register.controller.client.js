/**
 * Created by ch_su_00 on 4/5/2017.
 */

(function (){

    angular
        .module("RestaurantReviewApp")
        .controller("RegisterController" ,RegisterController);



    function RegisterController($location,$scope,$rootScope,UserService) {
        var vm = this;
        vm.register = register;

        function register(user){
            if( vm.user.password == vm.user.verifyPassword){

                user.imageUrl = "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSp5VUcMJyRB9rOmmPyb8laq0gbbA5M_1rS5p-6IP5imXUQAUGNXtn5DIE";

                UserService.register(user)
                    .then(function(user){
                        console.log(user);
                        $rootScope.currentUser = user;
                        $location.url("/home/"+ user._id);
                    });
            }else{
                vm.alert = "Password and verify password do not match";
            }

        }


    }

})();

