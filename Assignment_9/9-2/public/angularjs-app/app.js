angular.module("meanTennis", ["ngRoute"]).config(config);

function config($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "angularjs-app/player-list/playerList.html",
      controller: "PlayerListController",
      controllerAs: "vm",
    })
    .when("/:playerId", {
      templateUrl: "angularjs-app/player-display/player.html",
      controller: "PlayerController",
      controllerAs: "vm",
    })
    .when("/:playerId/edit", {
      templateUrl: "angularjs-app/player-edit/playerEdit.html",
      controller: "PlayerEditController",
      controllerAs: "vm",
    })
    .when("/:playerId/delete", {
      templateUrl: "angularjs-app/player-delete/playerDelete.html",
      controller: "PlayerDeleteController",
      controllerAs: "vm",
    });
}
