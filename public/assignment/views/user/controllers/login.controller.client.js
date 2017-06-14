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

            else if(password === null || password ==='' || typeof password === 'undefined') {
                model.error = "Password is required";
                return;
            }
            var promise = UserService.login(username, password)
            //findUserByCredentials(username, password);
            promise.then(function (loginUser) {
                if(loginUser.status == 401)
                {
                    model.error ="No such user exists";
                    $location.url("/login");
                }
                else if (loginUser.data)
                {
                    model.user = loginUser.data;
                    $rootscope.user = model.user;
                    model._id = model.user._id; //not working
                    $location.url("/user/"+ model.user._id);
                }
                else
                {
                    model.error = "No such user";
                    $location.url = ("/login");
                }

            }, function (error)
            {
                model.error = 'user not found';
                $location.url = ("/login");
            });

        }

    }

})();

