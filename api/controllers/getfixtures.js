const unirest = require("unirest");
const fs = require("fs");

exports.get_fixtures = (req, res, next) => {
  var date = req.query.date;

  unirest
    .get(`https://api-football-v1.p.mashape.com/fixtures/date/${date}`)
    .header(
      "X-Mashape-Key",
      "MS28qJFZ7Xmsha5aZupitiqCqfNxp1YbxTajsnujchiIa8wagS"
    )
    .header("Accept", "application/json")
    .end(result => {
      console.log(result.status, result.headers);
      let rawFixtures = result.body.api.fixtures;
      let fixtures = JSON.stringify(rawFixtures);
      console.log(rawFixtures);
      console.log(`Total: ${result.body.api.results}`);

      fs.writeFile(`./data/${date} fixtures.json`, fixtures, err => {
        if (err) console.log(err);
        console.log("Saved!");
      });

      res.status(200).json({
        fixtures: rawFixtures
      });
    });
};
