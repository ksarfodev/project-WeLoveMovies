const reviewsService = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reviewExists(req, res, next) {
  const review = await reviewsService.read(req.params.review_id);

  if (review) {
    res.locals.review = review;
    return next();
  }
  next({ status: 404, message: `Review cannot be found.` });
}

// Note that the tests make use of an in-memory SQLite database. When updating a record in an in-memory SQLite database, the server does not automatically respond with an array of updated records like PostgreSQL does. As a result, when updating a record, you will need to query the database again to return updated record.
async function update(req, res) {
  const updatedReview = {
    ...req.body.data,
    review_id: res.locals.review.review_id,
  };

  //perform update with no response
  await reviewsService.update(updatedReview);

  //get update
  const data = await reviewsService.read(res.locals.review.review_id);
  res.json({ data });
}

async function destroy(req, res) {
  const { review } = res.locals;
  await reviewsService.delete(review.review_id);
  res.sendStatus(204);
}

module.exports = {
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
};
