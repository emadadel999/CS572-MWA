angular.module("meanGames").directive("gamesNavigation", GamesNavigation);

function GamesNavigation() {
  return {
    restrict: "E",
    templateUrl: "angularjs-app/directives/navigation/navigation.html",
  };
}
