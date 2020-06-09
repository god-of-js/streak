const express = require("express");
const cors = require("cors");
const app = express();
const fileUpload = require('express-fileupload')
const bodyParser = require("body-parser");
require("./data/db")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(fileUpload({
    createParentPath: true
}))
app.use("/api/v1", require("./routes"));

app.listen(3000, () => {
    console.log("App is listening on port 3000");
})