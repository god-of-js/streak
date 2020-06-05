const router = require("express").Router();
const user = require("../controllers/user")

module.exports = router;
router.post("/register-user", user.register);