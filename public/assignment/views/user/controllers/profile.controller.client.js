(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController" , ProfileController);
    function ProfileController($routeParams ,UserService , $location) {
        var model = this;
        var userId = $routeParams['uid'];
        model.userId = userId;
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;

        function init() {
            var user = UserService.findUserById(userId);
            model.user = user;
        }
        init();

        function updateUser(newUser) {
            var user = UserService.updateUser(userId, newUser);
            if(user != null) {
                model.message = "User Successfully Updated!"
            } else {
                model.error = "Unable to update user";
            }
        }
        function deleteUser(delUser) {
            var found = UserService.deleteUserById(delUser._id);
            if (found == "UserNotFound"){
                model.error = "User not found";
            }
            else{
                $location.url("/login");
                return;
            }
        }
    }

})();