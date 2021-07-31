const express = require("express");
const {
  jobsGetAll,
  jobsAddOne,
  jobsGetOne,
  jobsUpdateOne,
  jobsDeleteOne,
} = require("../controllers/jobs.controller");

const router = express.Router();

router.route("/jobs").get(jobsGetAll).post(jobsAddOne);

router
  .route("/jobs/:jobId")
  .get(jobsGetOne)
  .put(jobsUpdateOne)
  .patch(jobsUpdateOne)
  .delete(jobsDeleteOne);

module.exports = router;
