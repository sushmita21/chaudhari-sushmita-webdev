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

                    $location.url('/user/' + loginUser._id);


            }, function (error)
            {
                model.error = 'user not found';
            });

        }

    }

})();

