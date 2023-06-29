const crypto = require('crypto');
const secretKey = process.env.paystackSecretKey;


const paystackWebhook = async function (req, res) {

    const payload = req.body;
    const hash = crypto
    .createHmac("sha512", secret)
    .update(JSON.stringify(payload))
    .digest("hex");

    console.log(hash)
  const signature = req.headers["x-paystack-signature"];
  if (!signature || signature !== hash) {
    console.log("paysatck-webhook-error: event not triggered by paystack");
    return res.status(400).end();
  };
  const { event, data } = payload;
  console.log("paystack-event-paload:", data);

  switch(event){
    case "charge.success":
        const status = data.status;
        const email = data.customer.email;

        if(status === "success"){

        }

  }


}