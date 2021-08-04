angular.module("meanGames").directive("footer", Footer);

function Footer() {
  return {
    restrict: "E",
    templateUrl: "angularjs-app/directives/footer/footer.html",
  };
}
