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
            console.log("inside register control");

            if(inputUser == null || inputUser.username == null || inputUser.password === null || inputUser.verifypassword === null)
            {

                model.error = "Username , Password and Verify Password fields are mandatory";
                return;
            }

            var userName = inputUser.username;
            console.log("userName"+userName);
            var promise = UserService.findUserByUsername(userName);
            console.log("promise"+promise);

            promise.then( function (found)
            {
                console.log("found"+found+"sush");

                if(found != null)
                {
                    model.error = "This Username has already been taken , Please use another name !";
                    return;
                }
                else
                {
                    if(inputUser.password == inputUser.verifypassword)
                    {
                        var promise1 = UserService.createUser(inputUser);
                        promise1.then(function (newUser){
                            $location.url("/user/" + newUser._id);
                        });

                    }
                    else
                    {
                        model.error = "Password and Verify Password do not match";
                    }

                return;

                }
            });
        }
    }

})();