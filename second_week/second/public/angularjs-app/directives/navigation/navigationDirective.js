angular.module("meanTennis").directive("tennisNavigation", TennisNavigation);

function TennisNavigation() {
  return {
    restrict: "E",
    templateUrl: "angularjs-app/directives/navigation/navigation.html",
  };
}
