// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var htmlRoute = require("./app/routing/htmlRoutes.js");
var apiRoute = require("./app/routing/apiRoutes.js")
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing

app.use("/", htmlRoute);
app.use("/", apiRoute);

app.listen(PORT, () => {
	console.log("We are listening")
})