const jwt = require('jose');
const _  = require('lodash');
const DSA = require('../models/dsa');



async function DsaAuth(req, res, next){
    if(req.headers && req.headers.authorization) {
        //authorization header is present
        var headerParts = req.headers.authorization.split(' ');
    
        if(headerParts.length === 2) {
          var scheme = headerParts[0];
          var credentials = headerParts[1];
    
          if(/^Bearer$/i.test(scheme)) {
            token = credentials;
          }
        } else {
            console.log('something went wrong')
          return res.status(400).json({
            message: 'Access Denied: access token not found',
          });
        }
      }
      try {
        
    const decodeSecret = Buffer.from(process.env.jwtSecret, 'base64').toString();
    const parseDecodedSecret = JSON.parse(decodeSecret)
    const secretKey = await jwt.importJWK(parseDecodedSecret, 'HS256');
        
    const protectedHeader = { alg: process.env.alg,  enc: process.env.enc }
    const claim = { issuer: process.env.issuer, audience: process.env.audience, expiration: process.env.expiration }

    const { protectedHeader : verifiedProtectedHeader, payload }  = await jwt.jwtDecrypt(token, secretKey, claim);
  
    if(_.isEqual(protectedHeader, verifiedProtectedHeader)){
        const user = await DSA.findOne({_id: payload.id});
        if(user){
          req.user = user
          return next();
        }else{
          return res.status(401).json({
            success: false,
            message: 'User access forbidden'
          })
        }
    }

      } catch (error) {
        return res.status(401).json({
          success: false,
          message: 'Invalid Token or Token expired'
        })
      }
};


module.exports = DsaAuth