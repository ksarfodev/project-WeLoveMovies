const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCategory = mapProperties({
  criticId: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
  c_ca: "critic.created_at",
  c_ua: "critic.updated_at",
});

function read(review_id) {
  return knex("reviews as r")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select(
      "review_id",
      "content",
      "score",
      "r.created_at",
      "r.updated_at",
      "r.critic_id",
      "r.movie_id",
      "c.critic_id as criticId",
      "c.preferred_name",
      "c.surname",
      "c.organization_name",
      "c.created_at as c_ca",
      "c.updated_at as c_ua"
    )
    .where({ review_id })
    .first()
    .then(addCategory);
}

function update(updatedReview) {
  return knex("reviews")
    .select("*")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview, "*");
}

function destroy(review_id) {
  return knex("reviews").where({ review_id }).del();
}

module.exports = {
  read,
  update,
  delete: destroy,
};
