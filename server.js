const express = require("express");
const path = require("path");
require("dotenv").config();
const app = express();
var apiRouter = require("./routers/api");
app.use(express.json());

app.use("/api/", apiRouter);

app.use(express.static(path.join(__dirname, "build")));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(9000);
