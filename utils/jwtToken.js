const jwt =  require('jose');



const jwtToken = async  function (jwtSecret, payload) {

   const  claim = { issuer: process.env.issuer, audience: process.env.audience, expiration: process.env.expiration }
  const  { issuer, audience, expiration} = claim


    const decodeSecret = Buffer.from(jwtSecret, 'base64').toString();
    const parseDecodedSecret = JSON.parse(decodeSecret)
    const secretKey = await jwt.importJWK(parseDecodedSecret, 'HS256');

    const protectedHeader = { alg: process.env.alg,  enc: process.env.enc }

    const jwtToken =  await new jwt.EncryptJWT(payload)
    .setProtectedHeader(protectedHeader)
    .setIssuedAt()
    .setIssuer(issuer)
    .setAudience(audience)
    .setExpirationTime(expiration)
    .encrypt(secretKey);

    return jwtToken

};



module.exports = jwtToken

