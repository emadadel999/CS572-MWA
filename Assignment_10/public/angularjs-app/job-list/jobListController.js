angular
  .module("meanJobSearch")
  .controller("JobListController", JobListController);

function JobListController(JobFactory, $location) {
  const vm = this;
  vm.todayDate = new Date();
  JobFactory.getJobs()
    .then(function (res) {
      vm.jobs = res;
    })
    .catch(function (err) {
      console.log("error getting job", err);
    });

  vm.newJob = {};
  vm.addJob = function () {
    console.log(vm.newJob);
    if (vm.newJob.locationName && vm.newJob.locationAddress) {
      const name = vm.newJob.locationName;
      const address = vm.newJob.locationAddress;
      vm.newJob.location = {
        name,
        address,
      };
    }
    JobFactory.addJob(vm.newJob)
      .then(function (res) {
        console.log("Job Added", res);
        $location.path(`/${res._id}`);
      })
      .catch(function (err) {
        console.log("err adding game", err);
        $location.path("/");
      });
  };
}
