var friendsData = require("../data/friends.js");

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        res.json(friendsData);
    });

    app.post("/api/friends", function(req, res) {
        var bestMatch = {
            name: "",
            photo: "",
            difference: 100
        }

        var userData = req.body;
        var userScores = userData.scores;

        var totalDiff = 0;

        for (i = 0; i < friendsData.length; i++) {
            console.log(friendsData[i].name);
            totalDiff = 0;

            for (j = 0; j < friendsData[i].scores.length; j++) {
                totalDiff += Math.abs(parseInt(userScores[j]) - parseInt(friendsData[i].scores[j]));

                if (totalDiff <= bestMatch.difference) {
                    bestMatch.name = friendsData[i].name;
                    bestMatch.photo = friendsData[i].photo;
                    bestMatch.difference = totalDiff;
                }
            }
        }

        friendsData.push(userData);

        res.json(bestMatch);
    });
}