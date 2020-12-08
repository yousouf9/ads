const express = require('express');
const Router = express.Router();
const {State} = require('../Models/stateModel');



//get all states
Router.get('/states',  async(req, res)=>{
   
    const state =  await State.find()
        if(!state) return res.status(400).json("failed to fetch states")

        res.status(200).json({
            success:true,
            result: state
        })
});



//get a single state
Router.get('/state/:name',  async(req, res)=>{
   
    const lgas =  await State.findOne({state:req.params.name})
        if(!lgas) return res.status(400).json( "failed to fetch lgas")

        res.status(200).json({
            success:true,
            result: lgas
        })
});

module.exports = Router;