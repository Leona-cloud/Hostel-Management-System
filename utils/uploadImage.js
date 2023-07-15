const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: process.env.cloudName, 
    api_key: process.env.apiKey, 
    api_secret: process.env.apiSecret 
  });

const uploadImage = async (image, fullname) => {
    try {
        const result = cloudinary.uploader.upload(`${image}`, { public_id: `${fullname}` })
        return result
    } catch (error) {
        console.log(error.message)
    }
};



module.exports = uploadImage