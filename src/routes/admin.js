const router = require("express").Router();
const admin = require("../controllers/admin/movie");
const make = require("../services/make");
const {isAuthenticated, isAccountType }= require('../middleware');
const upload = require('multer')()
module.exports = router;
router.post('/video-upload',
    upload.array("media"),
    isAuthenticated,
    isAccountType('admin'),
    make(admin.uploadMovie)
    );
router.post('/series-upload',
    upload.array("media"),
    isAuthenticated,
    isAccountType('admin'),
    make(admin.uploadSeries)
    );
router.post('/season-add',
    upload.array("media"),
    isAuthenticated,
    isAccountType('admin'),
    make(admin.addSeason)
    );
