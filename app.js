"use strict";

const PORT = process.env.PORT || 3000;

var express = require("express");
var bodyParser = require("body-parser");
var morgan = require("morgan");

var app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.use("/api", require("./routes/api"));

app.set("view engine", "jade");

app.listen(PORT, function (error) {
   console.log(error || `Server listening on port ${PORT}`);
});


