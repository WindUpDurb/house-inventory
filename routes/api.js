"use strict";

var express = require("express");
var router = express.Router();

router.use("/listofrooms", require("./listofrooms"));


module.exports = router;