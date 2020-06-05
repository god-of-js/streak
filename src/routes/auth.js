const router = require('express').Router()
const auth = require('../controllers/auth')
module.exports = router

router.post('/login', auth.login)