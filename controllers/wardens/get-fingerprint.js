const FingerPrint = require("../../models/fingerPrint");
const successResponse = require("../../responses/success-response");

const getFingerPrint = async (req, res) => {
  let { page } = req.query;
  let pageSize = 10;

  let pageNumber;
  if (page === undefined) {
    pageNumber = 0;
  } else {
    pageNumber = Number(page) - 1;
  };

  const pagination = pageNumber * pageSize;

  const fingerPrint = await FingerPrint.find().limit(pageSize).skip(pagination).select(["fp"]);

  try {
    const decoded = fingerPrint.map(
      (finger, data) =>
        (data = [
          {
            id: finger._id,
            fp: Buffer.from(finger.fp, "base64").toString(),
          },
        ])
    );

    return successResponse("fingerprints retrieved successfully", res, decoded);
  } catch (error) {
    console.log(error.message);
    return errorResponse(500, res, "get fingerprint failed");
  }
};

module.exports = getFingerPrint;
