const express = require('express');
const Router = express.Router();
const {Country} = require('../Models/countryModel');



//get all states
Router.get('/countries',  async(req, res)=>{r
   
    const country =  await Country.find()
        if(!country) return res.status(400).json("failed to fetch countries")

        res.status(200).json({
            success:true,
            result: country
        })
});



module.exports = Router;