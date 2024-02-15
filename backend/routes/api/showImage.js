const express = require("express");
const Sequelize = require("sequelize");
const { Show, ShowImage, User, Rsvp } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const Op = Sequelize;
const { v4: uuidv4 } = require('uuid');
// const AWS = require('aws-sdk')
// const fs = require('fs')
const { singleFileUpload, singleMulterUpload } = require("../../awsS3");



const router = express.Router();



router.post("/upload", singleMulterUpload('image'), requireAuth, async (req, res) => {
  // console.log(req.body.formData.fileName, '----req.body')
  const imageURL = await singleFileUpload({file: req.file, public: true})
  // const imageName = req.body.fileName

  return res.status(201).json(imageURL)
});
  

  // AWS.config.update({
  //   accessKeyId: process.env.AWS_ACCESS_KEY,
  //   secretAccessKey: process.env.AWS_SECRET_KEY,
  //   region: process.env.AWS_REGION
  // })
  
  // const s3 = new AWS.S3({
  //   accessKeyId: process.env.AWS_ACCES_KEY,
  //   secretAccessKey: process.env.AWS_SECRET_KEY
  // });


  
  // const image = req.files.file
  // try {
  //   console.log('----WE ARE IN THE TRY BLOCK')


  //   const params = {
  //     Bucket: 'artbeat-media',
  //     Key: `image-${uuidv4()}`, 
  //     ACL: 'public-read',
  //     Body: image
  //   };
    

  //   await s3.upload(params).promise()

  //   console.log('-----after aws upload....')

  //   res.send('File uploaded successfully')

  //   } catch (err) {
  //     console.log(err, '----WE ARE IN THE ERROR BLOCK :(')
  //     res.status(500).send('Error uploading file')
  //   }
//   }
// );


router.post("/", requireAuth, async (req, res) => { 
  const newImage = await ShowImage.create(req.body);
  return res.status(201).json(newImage);
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
