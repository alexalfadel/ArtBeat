const express = require("express");
const Sequelize = require("sequelize");
const { Show, ShowImage, User, Rsvp } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const Op = Sequelize;
const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk')
const fs = require('fs')
// const multer = require('multer');


const router = express.Router();


// AWS.config.update({
//   accessKeyId: process.env.AWS_ACCES_KEY,
//   secretAccessKey: process.env.AWS_SECRET_KEY
// })

// const s3 = new AWS.S3();


// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });


router.post("/upload", requireAuth, async (req, res) => {
  console.log('----WE MADE IT TO THE UPLOAD ROUTE')
  console.log(req.rawBody, '-----req.body')
  

  AWS.config.update({
    accessKeyId: process.env.AWS_ACCES_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION
  })
  
  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCES_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
  });


  
  const image = req.files.file
  try {
    console.log('----WE ARE IN THE TRY BLOCK')
    // console.log(req.body, '----req.body')
    // const fileContent = req.body.File
    // console.log(typeof fileContent)

    const params = {
      Bucket: 'artbeat-media',
      Key: `image-${uuidv4()}`, // Specify the file name in S3
      ACL: 'public-read',
      Body: image
    };
    

    await s3.upload(params).promise()

    console.log('-----after aws upload....')

    res.send('File uploaded successfully')

    } catch (err) {
      console.log(err, '----WE ARE IN THE ERROR BLOCK :(')
      res.status(500).send('Error uploading file')
    }
  }
);


router.post("/", requireAuth, async (req, res) => { 
  const {imageFile } = req.body

  // const key = `${title}_${uuidv4()}`

  const params = {
    Bucket: 'artbeat-media',
    Key: `image-${uuidv4()}`, // Specify the file name in S3
    ACL: 'public-read',
    Body: imageFile
  };

  let imageLocation;

  s3.putObject(params, async (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Failed to upload file');
    } else {
      console.log('File uploaded successfully:', data.Location);
      imageLocation = data.Location
  
      const newImage = await ShowImage.create({
        title: title,
        description: description,
        imageUrl: imageLocation,
        preview: preview,
        showId: showId
      });
    
      return res.status(201).json(newImage);
    }
  });
});

router.put('/:imageId', requireAuth, async (req, res) => {
  const image = await ShowImage.findByPk(req.params.imageId)
  
  if (!image) return res.status(404).json({message: 'Image does not exist'})
  const user = req.user
  const userShows = await Show.findAll({
    where: {
      userId: user.id
    }
  })
  const imageShow = userShows.filter((show) => show.id === image.showId)
  if (!imageShow) return res.status(403).json({message: 'You must own the image to delete it'})

  await image.set(req.body)

  await image.save()

  const updatedImage = ShowImage.findByPk(req.params.imageId)

  return res.status(200).json(updatedImage)
 })

module.exports = router;
