const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({

   name:{
       type:String,
       trim:true
   },
   code:{
    type:String,
    trim:true
   },
 
})

const Country = mongoose.model('Country', countrySchema);

module.exports.Country =   Country;