angular.module("meanJobSearch").controller("JobController", JobController);

function JobController(JobFactory, $routeParams, $location) {
  const vm = this;
  const { jobId } = $routeParams;

  JobFactory.getOneJob(jobId)
    .then(function (res) {
      vm.job = res;
    })
    .catch(function (err) {
      console.log("error getting job", err);
    });

  vm.returnBack = function () {
    $location.path("/");
  };
}
