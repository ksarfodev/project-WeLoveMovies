
const knex = require("../db/connection");
//const mapProperties = require("../utils/map-properties");

// const addCategory = mapProperties({
//     category_id: "movie.movie_id",
//     title: "movie.title",
//     description: "movie.description",
//   });

  function list() {
    return knex("products").select("*");
  }

  function read(movie_id) {
    return knex("movies as m")
      .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
      .join("theatres as t", "mt.theater_id", "t.theater_id")
      .select("m.*", "t.*")
      .where({ "m.movie_id": movie_id })
      .first();
     // .then(addCategory);
  }

  module.exports = {
    list,
    read,
  };