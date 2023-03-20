const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {

    const movie = await moviesService.read(req.params.movie_id);
   //console.log("movieExists",movie);
    if (movie) {
      res.locals.movie = movie;
      return next();
    }
    next({ status: 404, message: `Movie cannot be found.` });
  }
  
  function read(req, res) {
    const { movie: data } = res.locals;
    res.json({ data });
  }

  async function readTheaters(req, res) {
    const  data  = await moviesService.readTheaters(req.params.movie_id);
    console.log({data})
    res.json({ data });
  }

  async function readReviews(req, res) {
    const  data  = await moviesService.readReviews(req.params.movie_id);
    res.json({ data });
  }

  async function list(req, res) {
    const isShowing = req.query.is_showing;

    let data= [];
    if(isShowing){
       data = await moviesService.listMoviesShowing(isShowing);
    }
     else{
       data = await moviesService.list();
    }
    res.json({ data });
  }


  
  


  module.exports = {
    read: [asyncErrorBoundary(movieExists), read],
    readTheaters:[asyncErrorBoundary(movieExists), readTheaters],
    readReviews:[asyncErrorBoundary(movieExists), readReviews],
    list: asyncErrorBoundary(list),
  };