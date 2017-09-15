// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var fs = require("fs");

var apiApp = express();
var PORT = 3000;


// Sets up the Express app to handle data parsing
apiApp.use(bodyParser.json());
apiApp.use(bodyParser.urlencoded({ extended: true }));
apiApp.use(bodyParser.text());
apiApp.use(bodyParser.json({ type: "application/vnd.api+json" }));

var compatIndex = function(a,b) {
	var compatNum = 0;

	for(var i = 0;i<10;i++) {
		compatNum += Math.abs(parseInt(a[i]) - parseInt(b[i]));
	}

	return compatNum;
}
//POST Routes
apiApp.post("/api/friends", (req, res) => {
	var compatScoreIndex = [];
	var inputData = req.body;
	console.log(inputData);
	console.log("===========")

	fs.readFile(path.join(__dirname,"../data/friends.js"),"utf8", (err, data) => {
		if (err) throw err;
		console.log(data);
		var friendsObj = JSON.parse(data)
		var friendsToMatch = friendsObj.people;

		friendsToMatch.forEach((elem, index) => {
			console.log(elem.name);
			compatScoreIndex.push(compatIndex(elem.scores, inputData.scores));
		})

		console.log(compatScoreIndex);
		var lowestScore = Math.min.apply(null,compatScoreIndex);
		var mostCompatibleFriend = friendsToMatch[compatScoreIndex.indexOf(lowestScore)];
		console.log(mostCompatibleFriend);
		res.json(mostCompatibleFriend);
		friendsObj.people.push(inputData);


		fs.writeFile(path.join(__dirname,"../data/friends.js"),JSON.stringify(friendsObj),"utf8", (err) => {
			if (err) throw err;
		})

	})
})

module.exports = apiApp; 



// {
//   "name":"Ahmed",
//   "photo":"https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/6/005/064/1bd/3435aa3.jpg",
//   "scores":[
//       5,
//       1,
//       4,
//       4,
//       5,
//       1,
//       2,
//       5,
//       4,
//       1
//     ]
// }