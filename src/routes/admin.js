const router = require("express").Router();
const movies = require("../controllers/admin/movie");
const make = require("../services/make");
const {isAuthenticated, isAccountType }= require('../middleware');
const upload = require('multer')()
module.exports = router;
router.post('/video-upload',
    upload.array("media"),
    isAuthenticated,
    isAccountType('admin'),
    make(movies.uploadMovie)
    );
router.post('/series-upload',
    upload.array("media"),
    isAuthenticated,
    isAccountType('admin'),
    make(movies.uploadSeries)
    );
router.post('/season-add',
    upload.array("media"),
    isAuthenticated,
    isAccountType('admin'),
    make(movies.addSeason)
    );
router.get('/get-admin-series',
    isAuthenticated,
    isAccountType('admin'),
    make(movies.getAdminSeries)
    );
router.get('/get-admin-videos',
    isAuthenticated,
    isAccountType('admin'),
    make(movies.getAdminMovies)
    );
router.get('/get-admin-recently-added-movies',
        isAuthenticated,
        isAccountType('admin'),
        make(movies.getRecentlyAddedMovies)
    );
router.get('/get-admin-recently-added-series',
        isAuthenticated,
        isAccountType('admin'),
        make(movies.getRecentlyAddedSeries)
    );
router.get('/get-single-movie',movies.getSingleMovie)







