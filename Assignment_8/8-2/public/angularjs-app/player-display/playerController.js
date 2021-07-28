angular.module("meanTennis").controller("PlayerController", PlayerController);

function PlayerController($routeParams, PlayersFactory) {
  const vm = this;
  const playerId = $routeParams.playerId;
  PlayersFactory.getOnePlayer(playerId).then(function (player) {
    vm.player = player;
  });
}
