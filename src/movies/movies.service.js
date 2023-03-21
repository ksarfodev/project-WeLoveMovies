const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCategory = mapProperties({
  criticId: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
  createdAt: "critic.created_at",
  updatedAt: "critic.updated_at",
});

function list(isShowing) {
  if (isShowing) {
    return knex("movies as m")
      .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
      .where({ "mt.is_showing": true })
      .select(
        "m.movie_id as id",
        "m.title",
        "m.runtime_in_minutes",
        "m.description",
        "m.rating",
        "m.image_url"
      )
      .groupBy(
        "id",
        "m.title",
        "m.runtime_in_minutes",
        "m.description",
        "m.rating",
        "m.image_url"
      );
  } else {
    return knex("movies as m").select(
      "m.movie_id as id",
      "m.title",
      "m.runtime_in_minutes",
      "m.description",
      "m.rating",
      "m.image_url"
    );
  }
}

function read(movie_id) {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .select(
      "m.movie_id",
      "m.title",
      "m.runtime_in_minutes",
      "m.rating",
      "m.description",
      "m.image_url",
      "m.created_at",
      "m.updated_at"
    )
    .where({ "m.movie_id": movie_id })
    .first();
}

function readTheaters(movie_id) {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .join("theaters as t", "t.theater_id", "mt.theater_id")
    .select(
      "t.theater_id",
      "t.name",
      "address_line_1",
      "address_line_2",
      "city",
      "state",
      "zip",
      "t.created_at",
      "t.updated_at",
      "is_showing",
      "m.movie_id"
    )
    .where({ "m.movie_id": movie_id });
}

async function readReviews(movie_id) {
  let reviews = await knex("reviews as r")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select(
      "r.review_id",
      "r.content",
      "r.score",
      "r.created_at",
      "r.updated_at",
      "r.critic_id",
      "r.movie_id",
      "c.critic_id as criticId",
      "c.preferred_name",
      "c.surname",
      "c.organization_name",
      "c.created_at as createdAt",
      "c.updated_at as updatedAt"
    )
    .where({ "r.movie_id": movie_id });

  return reviews.map((review) => addCategory(review));
}

module.exports = {
  list,
  read,
  readTheaters,
  readReviews,
};
