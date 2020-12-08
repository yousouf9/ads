const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema({

   state:{
       type:String,
       trim:true
   },
   alias:{
    type:String,
    trim:true
   },
   lgas:[String]
})

const State = mongoose.model('State', stateSchema);

module.exports.State =   State;