const Query = require("../model");

module.exports = (req, res) => {
  const { query } = req.body || {};

    // console.log("Body", JSON.parse(req.body.query))

  new Query(JSON.parse(query))
    .save()
    .then((result) => res.status(200).json({ query: result }))
    .catch((e) => {
      res.status(400).json({ error: e });
      console.log(e);
    });
};