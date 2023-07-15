const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'dehufiqyo', 
    api_key: '978562413635456', 
    api_secret: 'CYKvhgEEEm8Kti3jzBXIzKr9tsA' 
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