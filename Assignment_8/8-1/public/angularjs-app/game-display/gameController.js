angular.module("meanGames").controller("GameController", GameController);

function _getStarsArray(stars) {
  return new Array(stars);
}

function GameController($routeParams, GamesFactory) {
  const vm = this;
  vm.title = "MEAN Games";
  const gameId = $routeParams.gameId;
  GamesFactory.getOneGame(gameId).then(function (game) {
    vm.game = game;
    vm.rating = _getStarsArray(game.rate);
  });
}
