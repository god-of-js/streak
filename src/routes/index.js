const router = require("express").Router();

module.exports = router;

router.use("/users",require("./users"));
router.use("/auth",require("./auth"));
router.use("/admin", require("./admin"))
router.use("/movie", require("./movies"))