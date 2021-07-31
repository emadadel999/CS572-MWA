angular.module("meanJobSearch").factory("JobFactory", JobFactory);

function JobFactory($http) {
  return {
    getJobs,
    getOneJob,
    addJob,
    updateJob,
    deleteJob,
  };

  function getJobs() {
    return $http.get("/api/jobs").then(complete).catch(fail);
  }
  function getOneJob(jobId) {
    return $http.get(`/api/jobs/${jobId}`).then(complete).catch(fail);
  }
  function addJob(job) {
    return $http.post("/api/jobs", job).then(complete).catch(fail);
  }
  function updateJob(jobId, job) {
    return $http.put(`/api/jobs/${jobId}`, job).then(complete).catch(fail);
  }
  function deleteJob(jobId) {
    return $http.delete(`/api/jobs/${jobId}`).then(complete).catch(fail);
  }

  function complete(res) {
    return res.data;
  }

  function fail(err) {
    return err;
  }
}
