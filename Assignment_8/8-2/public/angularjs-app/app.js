angular.module("meanTennis", ["ngRoute"]).config(config);

function config($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "angularjs-app/player-list/playerList.html",
      controller: "PlayerListController",
      controllerAs: "vm",
    })
    .when("/players/:playerId", {
      templateUrl: "angularjs-app/player-display/player.html",
      controller: "PlayerController",
      controllerAs: "vm",
    });
}
