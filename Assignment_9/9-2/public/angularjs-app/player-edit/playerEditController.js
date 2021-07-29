angular
  .module("meanTennis")
  .controller("PlayerEditController", PlayerEditController);

function PlayerEditController($routeParams, PlayersFactory, $location) {
  const vm = this;
  const playerId = $routeParams.playerId;
  vm.updatedPlayer = {};
  PlayersFactory.getOnePlayer(playerId)
    .then(function (player) {
      //console.log(player);
      vm.player = player;
    })
    .catch(function (err) {
      console.log("err getting game", err);
    });
  vm.editPlayer = function () {
    if (vm.playerForm.$valid) {
      console.log(vm.updatedPlayer);
      PlayersFactory.updateOnePlayer(playerId, vm.updatedPlayer)
        .then(function (res) {
          console.log("updatedPlayer from db", res);
          $location.path("/");
        })
        .catch(function (err) {
          console.log("server err updating: ", err);
          $location.path("/");
        });
    }
  };
  vm.returnBack = function () {
    $location.path("/");
  };
}
