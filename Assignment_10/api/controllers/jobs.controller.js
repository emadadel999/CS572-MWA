const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { encrypt, decrypt } = require("../helpers/myEncryptor");

const Job = mongoose.model("Job");

// do this later ////////
// {postDate: { $gte: '1987-10-19', $lte: Date.now() }}

module.exports.jobsGetAll = function (req, res) {
  const count = req.query.count ? parseInt(req.query.count) : 5;
  const offset = req.query.offset ? parseInt(req.query.offset) : 0;
  if (isNaN(offset) || isNaN(count)) {
    res.status(400).json({ message: "please use numbers in the query" });
  } else {
    Job.find(function (err, jobs) {
      const response = {
        status: 200,
        message: jobs,
      };
      if (err) {
        console.log("error finding jobs", err);
        response.status = 500;
        response.message = err;
      } else {
        console.log("found jobs", jobs.length);
        response.message.forEach((job) => {
          if (job.salary) {
            const decryptedSalary = decrypt(job.salary);
            job.salary = parseFloat(decryptedSalary);
          }
        });
      }
      res.status(response.status).json(response.message);
    })
      .lean()
      .limit(count)
      .skip(offset);
  }
};

module.exports.jobsGetOne = function (req, res) {
  const { jobId } = req.params;

  Job.findById(jobId, {}, { lean: true }, function (err, job) {
    const response = {
      status: 200,
      message: job,
    };
    if (err) {
      console.log("error finding jobs", err);
      response.status = 500;
      response.message = err;
    } else if (!job) {
      console.log("job not found", err);
      response.status = 404;
      response.message = err;
    } else {
      if (response.message.salary) {
        const decryptedSalary = decrypt(response.message.salary);
        response.message.salary = parseFloat(decryptedSalary);
      }
    }
    res.status(response.status).json(response.message);
  });
};

module.exports.jobsAddOne = function (req, res) {
  const newJob = {
    title: req.body.title,
    location: req.body.location,
    description: req.body.description,
    experience: req.body.experience,
    postDate: req.body.postDate,
    skills: [req.body.skill],
  };
  if (req.body.salary) {
    const encryptedSalary = encrypt(req.body.salary.toString());
    newJob.salary = encryptedSalary;
  }
  Job.create(newJob, function (err, createdJob) {
    const response = {
      status: 201,
      message: createdJob,
    };
    if (err) {
      console.log("error creating job", err);
      response.status = 500;
      response.message = err;
    } else {
      console.log("created job", createdJob);
    }
    res.status(response.status).json(response.message);
  });
};

module.exports.jobsUpdateOne = function (req, res) {
  //both PATCH and PUT can be handled here.
  const { jobId } = req.params;

  const jobToUpdate = {
    ...req.body,
  };
  if (req.body.skill) {
    jobToUpdate.skills = [req.body.skill];
  }
  if (req.body.salary) {
    const encryptedSalary = encrypt(req.body.salary.toString());
    jobToUpdate.salary = encryptedSalary;
  }
  console.log(jobToUpdate);
  Job.findByIdAndUpdate(
    jobId,
    jobToUpdate,
    { new: true },
    function (err, updatedJob) {
      const response = {
        status: 204, //No Content response
        message: updatedJob,
      };
      if (err) {
        console.log("error updating job", err);
        response.status = 500;
        response.message = err;
      } else if (!updatedJob) {
        console.log("job not found", err);
        response.status = 404;
        response.message = err;
      } else {
        console.log(updatedJob);
      }
      res.status(response.status).json(response.message);
    }
  );
};

module.exports.jobsDeleteOne = function (req, res) {
  const { jobId } = req.params;

  Job.findByIdAndDelete(jobId, {}, function (err, doc) {
    const response = {
      status: 204,
      message: doc,
    };
    if (err) {
      console.log("error deleting job", err);
      response.status = 500;
      response.message = err;
    }
    console.log("deleted job", doc);
    res.status(response.status).json(doc);
  });
};
