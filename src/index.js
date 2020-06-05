const express = require("express");

const app = express();

const bodyParser = require("body-parser");
require("./data/db")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/api/v1", require("./routes"));

app.listen(3000, () => {
    console.log("App is listening on port 3000");
})