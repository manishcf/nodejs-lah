const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  emailRegx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  collectionName = "queries",
  querySchema = new Schema(
    {
      fullName: { type: String, required: true },
      email: { type: String, required: true, validate: emailRegx },
      message: { type: String, required: true },
    },
    { strict: false }
  );

module.exports = mongoose.model(collectionName, querySchema);