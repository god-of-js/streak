const router = require("express").Router();
const videoUpload = require("../controllers/admin/movie");
const make = require("../services/make");
module.exports = router


router.post('/video-upload', make(videoUpload.upload));












