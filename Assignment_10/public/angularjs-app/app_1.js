angular.module("meanJobSearch", ["ngRoute"]).config(config);

function config($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "angularjs-app/job-list/job-list.html",
      controller: "JobListController",
      controllerAs: "vm",
    })
    .when("/:jobId", {
      templateUrl: "angularjs-app/job-display/job.html",
      controller: "JobController",
      controllerAs: "vm",
    })
    .when("/:jobId/edit", {
      templateUrl: "angularjs-app/job-edit/job-edit.html",
      controller: "JobEditController",
      controllerAs: "vm",
    })
    .when("/:jobId/delete", {
      templateUrl: "angularjs-app/job-delete/job-delete.html",
      controller: "JobDeleteController",
      controllerAs: "vm",
    })
    .otherwise({
      redirectTo: "/",
    });
}
