const router = require("express").Router();
const users = require("../controllers/users")

module.exports = router;

router.get("/", users.list);