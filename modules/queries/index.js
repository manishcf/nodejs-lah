const query = require("express")();
const queryController = require("./controllers/index");

query.post("/", queryController.create);
query.get("/download-csv", queryController.downloadCsv);

module.exports = query;
