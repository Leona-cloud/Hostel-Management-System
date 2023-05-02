const Joi = require('joi');

function createHostelSchema(hostel){
    const schema = Joi.object({
        gender: Joi.string().required(), 
        hostelName: Joi.string().required()
      });

      const options = {
        abortEarly: false,
        errors: {
            wrap: {
                label: ""
            },
        },
    }

    return schema.validate(hostel, options)
};





module.exports = createHostelSchema;