const router = require("express").Router();
const admin = require("../controllers/admin/movie");
const movies = require("../controllers/videos");
const make = require("../services/make");
const {isAuthenticated}= require('../middleware');
module.exports = router;


router.get('/get-series', isAuthenticated, make(movies.getSeries));


router.get('/get-movies', isAuthenticated, make(movies.getMovies));


router.get('/get-recently-added-movies', isAuthenticated, make(movies.getRecentlyAddedMovies));


router.get('/get-recently-added-series', isAuthenticated, make(movies.getRecentlyAddedSeries));


router.get('/get-single-movie', isAuthenticated, make(movies.getSingleMovie))


router.get('/get-single-serie', isAuthenticated, make(movies.getSingleSerie))


router.get('/get-anime-list', isAuthenticated, make(movies.getSingleSerie))







