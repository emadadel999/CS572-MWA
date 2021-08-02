angular
  .module("meanGames")
  .controller("GameEditController", GameEditController);

function GameEditController($routeParams, GamesFactory, $location) {
  const vm = this;
  const gameId = $routeParams.gameId;
  vm.formUpdatedGame = {};
  GamesFactory.getOneGame(gameId)
    .then(function (game) {
      vm.game = game;
    })
    .catch(function (err) {
      console.log("err getting game", err);
    });
  vm.updateGame = function () {
    if (vm.gameForm.$valid) {
      GamesFactory.updateOneGame(gameId, vm.formUpdatedGame)
        .then(function () {
          console.log("updatedGame from db");
          $location.path("/games");
        })
        .catch(function (err) {
          console.log("server err updating: ", err);
          $location.path("/games");
        });
    }
  };
  vm.returnBack = function () {
    $location.path("/games");
  };
}
