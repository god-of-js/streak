const express = require("express");

const app = express();

app.use((request, response, next) => {
    const token = request.get("authorization");

    if(!token || token !== "admin") response.status(401).send({message: "You are not authorized"})
    else next();
})

app.use("/api/v1", require("./routes"));

app.listen(3000, () => {
    console.log("App is listening on port 3000");
})