const errorResponse = require("../../responses/error-response");


const enrollFingerPrintSuccess = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "fingerprint enrolled successfully",
    });
  } catch (error) {
    console.log(error.message);
    return errorResponse(500, res, "enroll fingerprint failed");
  }
};

module.exports = enrollFingerPrintSuccess;
