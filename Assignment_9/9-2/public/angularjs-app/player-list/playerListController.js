angular
  .module("meanTennis")
  .controller("PlayerListController", PlayerListController);

function PlayerListController(PlayersFactory) {
  const vm = this;
  vm.newPlayer = {};
  PlayersFactory.getPlayers()
    .then(function (players) {
      vm.players = players;
    })
    .catch(function (err) {
      console.log("error getting players", err);
    });
  vm.addPlayer = function () {
    if (vm.playerForm.$valid) {
      console.log(vm.newPlayer);
      PlayersFactory.addPlayer(vm.newPlayer)
        .then(function (res) {
          console.log("result from adding player", res);
        })
        .catch(function (err) {
          console.log("error adding player", err);
        });
    }
  };
}
