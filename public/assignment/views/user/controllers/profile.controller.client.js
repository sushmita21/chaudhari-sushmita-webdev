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
            var promise = UserService.findUserById(userId);
            promise.then(function (user) {
                model.user = user;
            })
        }
        init();

        function updateUser(newUser) {
            var promise = UserService.updateUser(userId, newUser);
            promise.then(function (user)
            {
                if(user != null) {
                    model.message = "User Successfully Updated!"
                } else {
                    model.error = "Unable to update user";
                }
            });

        }
        function deleteUser(delUser) {
            var promise = UserService.deleteUserById(delUser._id);
            promise.then(function (found)
            {
                if (found == "UserNotFound"){
                    model.error = "User not found";
                }
                else{
                    $location.url("/login");
                    return;
                }
            });

        }
    }

})();