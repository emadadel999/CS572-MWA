angular
  .module("meanTennis")
  .controller("RegisterController", RegisterController);

function RegisterController(UsersFactory) {
  const vm = this;
  vm.newUser = {};
  vm.err = "";
  vm.register = function () {
    if (vm.newUser.password !== vm.newUser.confirmPassword) {
      vm.err = "passwords doesn't match";
    } else {
      UsersFactory.register(vm.newUser)
        .then(function (res) {
          vm.err = "";
          console.log("result", res);
        })
        .catch(function (err) {
          console.log("err", err);
          vm.err = err;
        });
    }
  };
}
