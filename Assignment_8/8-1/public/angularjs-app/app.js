angular.module("meanGames", ["ngRoute"]).config(config);

function config($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "angularjs-app/game-list/gameList.html",
      controller: "GameListController",
      controllerAs: "vm",
    })
    .when("/games/:gameId", {
      templateUrl: "angularjs-app/game-display/game.html",
      controller: "GameController",
      controllerAs: "vm",
    });
}
