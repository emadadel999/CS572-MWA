angular.module("meanGames", ["ngRoute", "angular-jwt"]).config(config).run(run);

function config($routeProvider, $httpProvider) {
  $httpProvider.interceptors.push("AuthInterceptor");
  $routeProvider
    .when("/", {
      templateUrl: "angularjs-app/welcome/welcome.html",
      access: {
        restricted: false,
      },
    })
    .when("/games", {
      templateUrl: "angularjs-app/game-list/gameList.html",
      controller: "GameListController",
      controllerAs: "vm",
      access: {
        restricted: false,
      },
    })
    .when("/games/:gameId", {
      templateUrl: "angularjs-app/game-display/game.html",
      controller: "GameController",
      controllerAs: "vm",
      access: {
        restricted: false,
      },
    })
    .when("/games/:gameId/edit", {
      templateUrl: "angularjs-app/game-edit/gameEdit.html",
      controller: "GameEditController",
      controllerAs: "vm",
    })
    .when("/games/:gameId/delete", {
      templateUrl: "angularjs-app/game-delete/gameDelete.html",
      controller: "GameDeleteController",
      controllerAs: "vm",
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
