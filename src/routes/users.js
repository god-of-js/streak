const router = require("express").Router();
const user = require("../controllers/user");
const make = require("../services/make");

module.exports = router;
router.post("/register-user", make(user.register));