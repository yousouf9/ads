const mongoose = require('mongoose');
const Joi = require('joi');

const FarmerSchema = new mongoose.Schema({
    name:{
        first:{
        type: String,
        maxlength: 100,
        required:true,
        trim: true

        },
        last:{
          type: String,
          maxlength: 100,
          required:true,
          trim: true

      },
      middle:{
        type: String,
        maxlength: 100,
        default:'',
        trim: true

    }
   },
   photo:{
    type:String,
    required:true,
    },
    association:{
       type: String,
       default:'',
       trim:true
    },
    location:{
        type:String,
        required:true,
        trim: true

    },
    size:{
        type:Number,
        required:true
    },
    state:{
        type:String,
        required:true,
        trim: true,
        maxlength:30
    },
    lga:{
       type:String,
        required:true,
        trim: true, 
        maxlength:30
    },
    ward:{
        type: String,
        default:'',
        trim:true
    },
    bvn:{
        type:Number,
        required:true,
        max:99999999999,
        min:-9999999999,
        unique:true,
    },
    bank:{
        type: String,
        default:'',
        required:true,
        trim:true,
        maxlength: 50
    },
    account:{
        type:Number,
        required:true
    }
})


const Farmer = mongoose.model('Farmer', FarmerSchema);


const validateInput = (userInputs) =>{
  const schema = Joi.object({

    name:{
        first:Joi.string().required().max(100),
        last:Joi.string().required().max(100),
        middle:Joi.string().max(100),
    },
    association: Joi.string().trim(),
    location: Joi.string().trim(),
    size:Joi.number().required(),
    state: Joi.string().required().trim(),
    lga:Joi.string().required().trim(),
    ward:Joi.string().trim(),
    bvn:Joi.number().required().min(-9999999999).max(99999999999),
    bank:Joi.string().required().trim(),
    account:Joi.number().required()



  });

  return schema.validate(userInputs, {abortEarly: false, allowUnknown: true});

}
module.exports.Farmer = Farmer;
module.exports.validateInput = validateInput;