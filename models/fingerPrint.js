const mongoose = require("mongoose");

const fingerPrintSchema = new mongoose.Schema({
  fp: {
    type: String,
    required: true,
  },

  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "student",
  },
});

const FingerPrint = mongoose.model("FingerPrint", fingerPrintSchema);

module.exports = FingerPrint;
