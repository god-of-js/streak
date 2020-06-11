const router = require("express").Router();
const videoUpload = require("../controllers/admin/movie");
const make = require("../services/make");
const upload = require('multer')()
module.exports = router


router.post('/video-upload',
    upload.array("media"),
    make(videoUpload.uploadMovie));









