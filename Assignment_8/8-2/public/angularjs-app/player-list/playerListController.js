angular
  .module("meanTennis")
  .controller("PlayerListController", PlayerListController);

function PlayerListController(PlayersFactory) {
  const vm = this;
  PlayersFactory.getPlayers().then(function (res) {
    vm.players = res;
  });
}
