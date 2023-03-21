const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const cors = require("cors");

router.use(cors());

router.route("/").get(controller.list).all(methodNotAllowed);

router
  .route("/:movie_id([0-9]+)/reviews")
  //.all(cors())
  .get(controller.readReviews)
  .all(methodNotAllowed);

router
  .route("/:movie_id([0-9]+)/theaters")
  .get(controller.readTheaters)
  .all(methodNotAllowed);

router.route("/:movie_id([0-9]+)")
.get(controller.read)
.all(methodNotAllowed);

module.exports = router;
