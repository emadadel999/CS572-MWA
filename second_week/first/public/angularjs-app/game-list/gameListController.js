angular
  .module("meanGames")
  .controller("GameListController", GameListController);

function GameListController(GamesFactory, $location) {
  const vm = this;
  GamesFactory.getGames()
    .then(function (res) {
      vm.games = res;
    })
    .catch(function (err) {
      console.log("error getting game", err);
    });
  vm.newGame = {};
  vm.addGame = function () {
    if (vm.gameForm.$valid) {
      GamesFactory.addOneGame(vm.newGame)
        .then(function (res) {
          console.log("Game Added", res);
          $location.path(`/${res._id}`);
        })
        .catch(function (err) {
          console.log("err adding game", err);
          $location.path("/");
        });
    }
  };
}
