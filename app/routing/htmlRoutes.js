// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");


var htmlApp = express();
var PORT = 3000;


// Sets up the Express app to handle data parsing
htmlApp.use(bodyParser.json());
htmlApp.use(bodyParser.urlencoded({ extended: true }));
htmlApp.use(bodyParser.text());
htmlApp.use(bodyParser.json({ type: "application/vnd.api+json" }));


//Get Routes
htmlApp.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/home.html"));
});

htmlApp.get("/survey", (req, res) => {
	res.sendFile(path.join(__dirname, "../public/survey.html"));
})

// htmlApp.listen(PORT, () => {
// 	console.log("We are up on " + PORT);
// })

module.exports = htmlApp;