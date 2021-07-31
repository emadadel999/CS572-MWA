angular
  .module("meanJobSearch")
  .controller("JobEditController", JobEditController);

function JobEditController($routeParams, JobFactory, $location) {
  const vm = this;
  const jobId = $routeParams.jobId;
  vm.todayDate = new Date();
  JobFactory.getOneJob(jobId)
    .then(function (res) {
      console.log("got job to update", res);
      res.postDate = new Date(res.postDate).toISOString().substring(0, 10);
      vm.job = res;
    })
    .catch(function (err) {
      console.log("error getting job to update", err);
    });

  vm.updatedJob = {};
  vm.editJob = function () {
    console.log(vm.updatedJob);
    if (vm.updatedJob.locationName && vm.updatedJob.locationAddress) {
      const name = vm.updatedJob.locationName;
      const address = vm.updatedJob.locationAddress;
      vm.updatedJob.location = {
        name,
        address,
      };
    }
    if (!vm.updatedJob.postDate) {
      vm.updatedJob.postDate = new Date(vm.job.postDate).toISOString();
    }
    console.log(vm.updatedJob);
    JobFactory.updateJob(jobId, vm.updatedJob)
      .then(function () {
        console.log("job updated successfully");
      })
      .catch(function (err) {
        console.log("error updating job", err);
      });
  };
  vm.returnBack = function () {
    $location.path("/");
  };
}
