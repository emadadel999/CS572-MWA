angular
  .module("meanGames")
  .controller("GameListController", GameListController);

function GameListController(GamesFactory) {
  const vm = this;
  vm.title = "MEAN Games";
  GamesFactory.getGames().then(function (res) {
    vm.games = res;
  });
}
