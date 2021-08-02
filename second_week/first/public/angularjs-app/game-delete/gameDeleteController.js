angular
  .module("meanGames")
  .controller("GameDeleteController", GameDeleteController);

function GameDeleteController($routeParams, GamesFactory, $location) {
  const vm = this;
  const gameId = $routeParams.gameId;
  GamesFactory.getOneGame(gameId)
    .then(function (game) {
      vm.game = game;
    })
    .catch(function (err) {
      console.log("err getting game", err);
    });
  vm.deleteGame = function () {
    GamesFactory.deleteGame(gameId)
      .then(function (deleted) {
        console.log("deleted Game from db", deleted);
        $location.path("/games");
      })
      .catch(function (err) {
        console.log("server err updating: ", err);
        $location.path("/games");
      });
  };
  vm.returnBack = function () {
    $location.path("/games");
  };
}
