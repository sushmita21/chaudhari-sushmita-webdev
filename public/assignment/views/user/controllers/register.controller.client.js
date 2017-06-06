(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController" , RegisterController);

    function RegisterController($location ,UserService) {

        var model = this;
        model.register = register;

        function init()
        {
            //nothing
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
            var promise = UserService.findUserByUsername(userName);

            promise.then( function (found)
            {
                    model.error = "This Username has already been taken , Please use another name !";
                    return;

            }, function (notFound) {
                if(inputUser.password == inputUser.verifypassword)
                {
                    var promise = UserService.createUser(inputUser);
                    promise.then(function (newUser){
                        $location.url("/user/" + newUser._id);
                    });

                }
                else
                {
                    model.error = "Password and Verify Password do not match";
                }
                return;
            });
        }
    }

})();