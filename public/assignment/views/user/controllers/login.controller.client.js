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
            var found = UserService.findUserByCredentials(username, password);

            if(found != null) {
                $location.url('/user/' + found._id);
            } else {
                model.error = 'Username '+ username +' and password combination not found';
            }
        }
    }

})();

