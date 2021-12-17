const mongoose = require("mongoose");

const EditorialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "The name is required"],
    trim: true,
  },
  dateOfCreation: {
    type: Date,
    required: [true, "The date is required"],
  },
  author: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "user",
    },
  ],
  book: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "book",
    },
  ],
});

const EditorialModel = new mongoose.model("editorial", EditorialSchema);

module.exports = EditorialModel;
