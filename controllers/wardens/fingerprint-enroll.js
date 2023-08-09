const FingerPrint = require("../../models/fingerPrint");
const Student = require("../../models/student");
const errorResponse = require("../../responses/error-response");
const { Buffer } = require('node:buffer')

const enrollFingerPrint = async (req, res) => {
  const email = req.query.email;
  const { fp } = req.body;
  

const encode = Buffer.from(fp, 'binary').toString('base64');
console.log(encode);


  const studentExists = await Student.findOne({ email: email }).select([
    "-password",
  ]);
  if (!studentExists)
    return res.status(400).json({
      success: false,
      message: "Student does not exist",
    });

  try {
    const enrollFP = await FingerPrint.create({
      fp: encode,
      studentId: studentExists.Id,
    });

    console.log(enrollFP, "fingerprint");

    return res.status(200).json({
      success: true,
      message: "fingerprint enrolled successfully",
    });
  } catch (error) {
    console.log(error.message);
    return errorResponse(500, res, "enroll fingerprint failed");
  }
};

module.exports = enrollFingerPrint;
