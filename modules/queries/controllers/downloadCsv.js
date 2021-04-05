const Query = require("../model");
const fastcsv = require("fast-csv");
module.exports = (req, res) => {
  Query.find({})
    .then((Queries) => {
      res.setHeader(
        "Content-disposition",
        `attachment; filename=data${new Date().toISOString()}.csv`
      );
      res.setHeader("Content-type", "text/csv");
      fastcsv
        .write(
          Queries.map(({ fullName = "", email = "", message = "" }) => ({
            fullName,
            email,
            message,
          })),
          { headers: true }
        )
        .on("finish", (result) => {
          res.download("public/", "data.csv");
        })
        .pipe(res);
    })
    .catch((e) => {
      res.status(400).send(e);
      console.log(e);
    });
};
