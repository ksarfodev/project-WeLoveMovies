
const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCategory = mapProperties({
    critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name:"critic.organization_name",
    created_at:"critic.created_at",
    updated_at:"critic.updated_at"
  });

  function list() {
    return knex("movies as m").select("m.movie_id as id","m.title","m.runtime_in_minutes","m.description","m.rating","m.image_url");
  }

  function listMoviesShowing(isShowing) {
    return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .where({"mt.is_showing":isShowing})
    .select("m.movie_id as id","m.title","m.runtime_in_minutes","m.description","m.rating","m.image_url")
    .groupBy("id","m.title","m.runtime_in_minutes","m.description","m.rating","m.image_url");
    
  }

  function read(movie_id) {
    return knex("movies as m")
      .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
      .select("*")
      .where({ "m.movie_id": movie_id })
      .first();
     // .then(addCategory);
  }

  function readTheaters(movie_id) {
    return knex("movies as m")
      .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
      .join("theaters as t", "m.movie_id", "mt.movie_id")
      .select("t.theater_id","t.name","address_line_1","address_line_2","city","state","zip","t.created_at","t.updated_at","is_showing","m.movie_id")
      .where({ "m.movie_id": movie_id });
      //.first();
     // .then(addCategory);
  }

  function readReviews(movie_id) {
    return knex("reviews as r")
      .join("critics as c", "c.critic_id", "r.critic_id")
      .select("*")
      .where({ "r.movie_id": movie_id })
      .first()
      .then(addCategory);
  }

  module.exports = {
    list,
    listMoviesShowing,
    read,
    readTheaters,
    readReviews,
  };