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

  

  async function update(req, res) {
    const updatedReview = {
      ...req.body.data,
      review_id: res.locals.review.review_id,
    };

    //perform update with no return
     await reviewsService.update(updatedReview);

     //get update
    const data = await reviewsService.read(res.locals.review.review_id)
    res.json({ data });
  }

  async function destroy(req, res) {
    const { review } = res.locals;
    await reviewsService.delete(review.review_id);
    res.sendStatus(204);
  }
  

  module.exports = {
    update: [
        asyncErrorBoundary(reviewExists),
        asyncErrorBoundary(update),
      ],
      delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
  };