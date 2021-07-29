angular.module("meanGames", ["ngRoute"]).config(config);

function config($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "angularjs-app/game-list/gameList.html",
      controller: "GameListController",
      controllerAs: "vm",
    })
    .when("/:gameId", {
      templateUrl: "angularjs-app/game-display/game.html",
      controller: "GameController",
      controllerAs: "vm",
    })
    .when("/:gameId/edit", {
      templateUrl: "angularjs-app/game-edit/gameEdit.html",
      controller: "GameEditController",
      controllerAs: "vm",
    })
    .when("/:gameId/delete", {
      templateUrl: "angularjs-app/game-delete/gameDelete.html",
      controller: "GameDeleteController",
      controllerAs: "vm",
    });
}
