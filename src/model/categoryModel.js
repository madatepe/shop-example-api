const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true, slug: "title" },
});

module.exports = mongoose.model("Category", categorySchema);
