angular
  .module("meanJobSearch")
  .controller("JobDeleteController", JobDeleteController);

function JobDeleteController($routeParams, JobFactory, $location) {
  const vm = this;
  const jobId = $routeParams.jobId;
  JobFactory.getOneJob(jobId)
    .then(function (job) {
      vm.job = job;
    })
    .catch(function (err) {
      console.log("err getting job", err);
    });
  vm.deleteJob = function () {
    JobFactory.deleteJob(jobId)
      .then(function (deleted) {
        console.log("deleted job from db", deleted);
        $location.path("/");
      })
      .catch(function (err) {
        console.log("server err updating: ", err);
        $location.path("/");
      });
  };
  vm.returnBack = function () {
    $location.path("/");
  };
}
