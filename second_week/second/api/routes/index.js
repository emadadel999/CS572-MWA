const express = require("express");
const {
  playersGetAll,
  playersAddOne,
  playersGetOne,
  playersDeleteOne,
  playersFullUpdateOne,
  playersPartialUpdateOne,
} = require("../controllers/players.controller");
const {
  trophiesGetAll,
  trophiesAddOne,
  trophiesGetOne,
  trophiesDeleteOne,
  trophiesUpdateOne,
} = require("../controllers/tophies.controller");
const {
  register,
  login,
  authenticate,
} = require("../controllers/users.controller");

const router = express.Router();

router.route("/players").get(playersGetAll).post(authenticate, playersAddOne);

router
  .route("/players/:playerId")
  .get(playersGetOne)
  .put(playersFullUpdateOne)
  .patch(playersPartialUpdateOne)
  .delete(playersDeleteOne);

router
  .route("/players/:playerId/trophies")
  .get(trophiesGetAll)
  .post(trophiesAddOne);

router
  .route("/players/:playerId/trophies/:trophyId")
  .get(trophiesGetOne)
  .put(trophiesUpdateOne)
  .delete(trophiesDeleteOne);

router.route("/register").post(register);
router.route("/login").post(login);

module.exports = router;
