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
  register,
  login,
  authenticate,
} = require("../controllers/users.controller");
const router = express.Router();

router.route("/games").get(gamesGetAll).post(authenticate, gamesAddOne);

router
  .route("/games/:gameId")
  .get(gamesGetOne)
  .put(gamesFullUpdateOne)
  .patch(gamesPartialUpdateOne)
  .delete(gamesDeleteOne);

router.route("/register").post(register);
router.route("/login").post(login);
module.exports = router;
