angular.module("meanGames").controller("GameController", GameController);

function _getStarsArray(stars) {
  return new Array(stars);
}

function GameController($routeParams, GamesFactory, $location) {
  const vm = this;
  const gameId = $routeParams.gameId;
  GamesFactory.getOneGame(gameId).then(function (game) {
    vm.game = game;
    vm.rating = _getStarsArray(game.rate);
  });
  vm.returnBack = function () {
    $location.path("/");
  };
}
