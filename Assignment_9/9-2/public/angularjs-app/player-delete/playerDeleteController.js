angular
  .module("meanTennis")
  .controller("PlayerDeleteController", PlayerDeleteController);

function PlayerDeleteController($routeParams, PlayersFactory, $location) {
  const vm = this;
  const playerId = $routeParams.playerId;
  PlayersFactory.getOnePlayer(playerId)
    .then(function (player) {
      vm.player = player;
    })
    .catch(function (err) {
      console.log("err getting player", err);
    });
  vm.deletePlayer = function () {
    PlayersFactory.deletePlayer(playerId)
      .then(function (deleted) {
        console.log("deleted player from db", deleted);
        $location.path("/");
      })
      .catch(function (err) {
        console.log("server err updating: ", err);
        $location.path("/");
      });
  };
  vm.returnBack = function () {
    $location.path("/");
  };
}
