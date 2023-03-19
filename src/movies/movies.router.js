const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/").get(controller.list).all(methodNotAllowed);

router
  .route("/?is_showing")
  .get(controller.listShowingMovies)
  .all(methodNotAllowed);

module.exports = router;