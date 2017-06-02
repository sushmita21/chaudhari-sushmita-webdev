(function (){
    angular
        .module("WebAppMaker")
        .controller("LoginController" ,LoginController);
    function LoginController( $location, UserService) {
        var model = this;
        model.login = login;
        function init() {
        }
        init();
        function login(username, password) {
            if(username === null || username === '' || typeof username === 'undefined') {
                model.error = "Username is required";
                return;
            }

            if(password === null || password ==='' || typeof password === 'undefined') {
                model.error = "Password is required";
                return;
            }
            var promise = UserService.findUserByCredentials(username, password);
            promise.then(function (loginUser) {

                if(loginUser !== null) {
                    $location.url('/user/' + loginUser._id);
                } else {
                    model.error = 'user not found';
                }

            });


               /* .success(function (userData) {

                console.log("userData");
                console.log(userData);
                if(userData != null) {
                    $location.url('/user/' + userData._id);
                } else {
                    model.error = 'Username '+ username +' and password combination not found';
                }

            }
                    .error(function () {
                        console.log("error");
                    }));

            */
        }

    }

})();

