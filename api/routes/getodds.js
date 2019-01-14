const express = require("express");
const router = express.Router();
const unirest = require("unirest");
const fs = require("fs");

router.get("/", (req, res, next) => {
  var teams = req.query.teams;
  var date = req.query.date;
  console.log(teams);

  fs.readFile(`./data/${date} fixtures.json`, (err, data) => {
    if (err) {
      res.json({
        error: err
      });
    }

    let fixtures = JSON.parse(data);

    for (var team in teams) {
      for (var key of Object.keys(fixtures)) {
        let home = fixtures[key].homeTeam;
        let away = fixtures[key].awayTeam;
        let fixture_id = fixtures[key].fixture_id;
        if (home === teams[team] || away === teams[team]) {
          unirest
            .get(`https://api-football-v1.p.mashape.com/odds/${fixture_id}`)
            .header(
              "X-Mashape-Key",
              "MS28qJFZ7Xmsha5aZupitiqCqfNxp1YbxTajsnujchiIa8wagS"
            )
            .header("Accept", "application/json")
            .end(result => {
              console.log(result.status, result.headers);
              let rawOdds = result.body.api.odds;
              rawOdds.home = home;
              rawOdds.away = away;

              let odds = JSON.stringify(rawOdds);

              fs.writeFile(
                `./data/${home} - ${away} ${date} odds.json`,
                odds,
                err => {
                  if (err) {
                    console.log(err);
                    res.status(200).json({
                      error: err
                    });
                  }
                  console.log("Saved!");
                }
              );
            });
        }
      }
    }
  });
});

module.exports = router;
