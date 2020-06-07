const router = require('express').Router()
const auth = require('../controllers/auth')
const make = require("../services/make");
module.exports = router

router.post('/login', make(auth.login))