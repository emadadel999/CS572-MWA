angular
  .module("meanTennis", ["ngRoute", "angular-jwt"])
  .config(config)
  .run(run);

function config($routeProvider, $httpProvider) {
  $httpProvider.interceptors.push("AuthInterceptor");
  $routeProvider
    .when("/", {
      templateUrl: "angularjs-app/welcome/welcome.html",
      access: {
        restricted: false,
      },
    })
    .when("/players", {
      templateUrl: "angularjs-app/player-list/playerList.html",
      controller: "PlayerListController",
      controllerAs: "vm",
      access: {
        restricted: false,
      },
    })
    .when("/players/:playerId", {
      templateUrl: "angularjs-app/player-display/player.html",
      controller: "PlayerController",
      controllerAs: "vm",
      access: {
        restricted: false,
      },
    })
    .when("/players/:playerId/edit", {
      templateUrl: "angularjs-app/player-edit/playerEdit.html",
      controller: "PlayerEditController",
      controllerAs: "vm",
      access: {
        restricted: false,
      },
    })
    .when("/players/:playerId/delete", {
      templateUrl: "angularjs-app/player-delete/playerDelete.html",
      controller: "PlayerDeleteController",
      controllerAs: "vm",
      access: {
        restricted: false,
      },
    })
    .when("/register", {
      templateUrl: "angularjs-app/register/register.html",
      controller: "RegisterController",
      controllerAs: "vm",
      access: {
        restricted: false,
      },
    })
    .when("/profile", {
      templateUrl: "angularjs-app/profile/profile.html",
      access: {
        restricted: true,
      },
    })
    .otherwise({
      redirectTo: "/",
    });
}

function run($rootScope, $location, AuthFactory) {
  $rootScope.$on(
    "$routeChangeStart",
    function (event, nextRoute, currentRoute) {
      if (
        nextRoute.access &&
        nextRoute.access.restricted &&
        !AuthFactory.authenticated
      ) {
        event.preventDefault(); //don't go to the path
        $location.path("/");
      }
    }
  );
}
