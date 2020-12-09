const { Farmer, validateInput}  = require('../Models/farmerModel');

const express = require('express');
const Router = express.Router();
const multer = require('multer');
const upload = multer({dest : 'public/images/users'});

Router.post('/create/farmer', upload.single('profileImage'), async(req,res)=>{

            let mainImageOriginalName,
                    mainImageName,
                    mainImageMimeType,
                    mainImagePath,
                    mainImageExtension,
                    mainImageSize;  

                if(req.file){

                    mainImageOriginalName        = req.file.originalname;
                    mainImageName                = req.file.filename;
                    mainImageMimeType            = req.file.mimetype;
                    mainImagePath                = req.file.path;
                    mainImageExtension           = req.file.extension;
                    mainImageSize                = req.file.size;

                }else{
                console.log('Not uploading photo...');
                mainImageName = 'noimage.png';
                }

            //setting the name of the image
        req.body.photo = `${req.protocol}://${req.headers.host}/images/users/${mainImageName}`; 
        
        

        const {error}  = validateInput(req.body);
        if(typeof error !== 'undefined') return res.status(400).json({error: error});


        let farmer = await Farmer.findOne({bvn: req.body.bvn});
        if(farmer)  return res.status(409).send("Farmer already exist!");



        console.log("Here",req.body);

         farmer = new Farmer(req.body);

        if(!farmer)  return res.status(400).send("Invalid Farmer details details");

        
        const result = await farmer.save();

        if(!result) return res.status(400).send('Failed to save new farmer');

        res.status(200).json({
            success:true,
            result:farmer
        })


})
Router.put('/update/farmer/:id',  upload.single('profileImage'), async(req, res)=>{
                
    let mainImageOriginalName,
            mainImageName,
            mainImageMimeType,
            mainImagePath,
            mainImageExtension,
            mainImageSize;  

        if(req.file){


            mainImageOriginalName        = req.file.originalname;
            mainImageName                = req.file.filename;
            mainImageMimeType            = req.file.mimetype;
            mainImagePath                = req.file.path;
            mainImageExtension           = req.file.extension;
            mainImageSize                = req.file.size;

            //setting the name of the image if provided
            req.body.photo = `${req.protocol}://${req.headers.host}/images/users/${mainImageName}` 

        }

    
         
  const farmer =  await Farmer.findOneAndUpdate({$or :[{_id:req.params.id},{bvn:req.body.bvn}, ]}, {
            $set:{
                 ...req.body
            }
    },{new:true,useFindAndModify:true});

  //  console.log('uploading photo...again', req.admin);
    if(!farmer)  return res.status(400).send("Failed to upload images");

    res.status(200).json({
        success:true,
        result:farmer
    }) 

})

Router.get('/find/farmers',  async(req, res)=>{
    
    let farmer = await Farmer.find();
    if(!farmer)  return res.status(409).send("empty farmers");

    res.json({
        success:true,
        result: farmer
    })
})

Router.get('/find/farmer/:bvn',  async(req, res)=>{
    
    const farmer = await Farmer.findOne({bvn: req.params.bvn});
    if(!farmer)  return res.status(409).send("Farmer with the given bvn does not exist!");

    res.json({
        success:true,
        result: farmer
    })
})

Router.delete('/delete/farmer/:bvn', async(req, res)=>{
    const farmer=  await Farmer.findOneAndRemove({bvn:req.params.bvn},{useFindAndModify:true});

    if(!farmer)  return res.status(400).send("Failed to Delete Farmer");
    res.status(200).json({
        Deleted:true,
        result:farmer
    })
})
module.exports = Router