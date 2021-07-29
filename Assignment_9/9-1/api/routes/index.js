const express = require("express");
const {
  gamesGetAll,
  gamesAddOne,
  gamesGetOne,
  gamesDeleteOne,
  gamesFullUpdateOne,
  gamesPartialUpdateOne,
} = require("../controllers/games.controller");
const {
  publisherGetOne,
  publisherAddOne,
} = require("../controllers/publisher.controller");
const router = express.Router();

router.route("/games").get(gamesGetAll).post(gamesAddOne);

router
  .route("/games/:gameId")
  .get(gamesGetOne)
  .put(gamesFullUpdateOne)
  .patch(gamesPartialUpdateOne)
  .delete(gamesDeleteOne);

router
  .route("/games/:gameId/publisher")
  .get(publisherGetOne)
  .post(publisherAddOne);

module.exports = router;
