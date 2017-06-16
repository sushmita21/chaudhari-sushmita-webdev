(function (){
    angular
        .module("WebAppMaker")
        .controller("LoginController" ,LoginController);
    function LoginController( $location, UserService, $rootScope) {
        var model = this;
        model.login = login;
        function init() {
        }
        init();
        function login(user) {
            var username = user.username;
            var password = user.password;
            if(username === null || username === '' || typeof username === 'undefined') {
                model.error = "Username is required";
                return;
            }

            else if(password === null || password ==='' || typeof password === 'undefined') {
                model.error = "Password is required";
                return;
            }
            else{

                console.log(user);
                var promise = UserService.login(user);
                //findUserByCredentials(username, password);
                promise.then(function (loginUser) {
                    if(loginUser.status == 401)
                    {
                        model.error ="No such user exists";
                        $location.url("/login");
                    }
                    else if (loginUser.data)
                    {

                        var user = loginUser.data;

                        console.log(user[0]);
                        $rootScope.currentUser = user[0];
                        $location.url("/user/"+ user[0]._id);
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

    }

})();

