(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController" , RegisterController);

    function RegisterController($location ,UserService, $rootScope) {

        var model = this;
        model.register = register;

        function init()
        {
            //no    thing
        }
        init();

        function register(inputUser)
        {
             if(inputUser == null || inputUser.username == null || inputUser.password === null || inputUser.verifypassword === null)
             {
             model.error = "Username , Password and Verify Password fields are mandatory";
             return;
             }

            var userName = inputUser.username;
            if(inputUser.password == inputUser.verifypassword)
            {
                UserService
                    .register(inputUser)
                    .then(
                        function(response) {
                            var user = response.data;
                            console.log(user._id);
                            console.log(user);
                            $rootScope.currentUser = user;
                            $location.url("/user/"+user._id);
                        });

            }
            else
            {
                model.error = "Password and Verify Password do not match";
            }
            return;
        }
    }

})();