angular.module("meanGames").controller("LoginController", LoginController);

function LoginController(
  UsersFactory,
  $window,
  $location,
  jwtHelper,
  AuthFactory
) {
  const vm = this;
  vm.user = {};
  vm.isLoggedIn = function () {
    return AuthFactory.authenticated;
  };
  vm.login = function () {
    UsersFactory.login(vm.user)
      .then(function (result) {
        vm.err = "";
        console.log("result", result);
        if (result.success) {
          $window.sessionStorage.token = result.token;
          vm.user = {};

          const token = $window.sessionStorage.token;
          const decodedToken = jwtHelper.decodeToken(token);
          vm.loggedInUser = decodedToken.name;

          AuthFactory.authenticated = true;

          $location.path("/");
        }
      })
      .catch(function (err) {
        console.log("err", err);
        vm.err = err;
      });
  };

  vm.logout = function () {
    AuthFactory.authenticated = false;
    delete $window.sessionStorage.token;
    $location.path("/");
  };
}
