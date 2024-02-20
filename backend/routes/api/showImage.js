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
  const { title, description, preview, showId } = req.body
  const imageURL = await singleFileUpload({file: req.file, public: true})
  const newImage = await ShowImage.create({
    title: title,
    description: description,
    imageUrl: imageURL,
    preview: preview,
    showId: showId

  });
  
  return res.status(201).json(newImage);


});
  


router.post("/", requireAuth, async (req, res) => { 
  const newImage = await ShowImage.create(req.body);
  return res.status(201).json(newImage);
});

router.put('/:imageId', singleMulterUpload('image'), requireAuth, async (req, res) => {
  const {title, description, preview, showId, imageUrl} = req.body
  const showImage = await ShowImage.findByPk(req.params.imageId)
  
  if (!showImage) return res.status(404).json({message: 'Image does not exist'})
  const user = req.user
  const userShows = await Show.findAll({
    where: {
      userId: user.id
    }
  })
  const imageShow = userShows.filter((show) => show.id === showImage.showId)
  if (!imageShow) return res.status(403).json({message: 'You must own the image to update it'})

  if (!req.file) {
    await showImage.set({
      title: title,
      description: description,
      preview: preview,
      showId: showId,
      imageUrl: imageUrl
    })

    await showImage.save()
  } else {
    const newImageUrl = await singleFileUpload({file: req.file, public: true})
    await showImage.set({
      title: title,
      description: description,
      preview: preview,
      showId: showId,
      imageUrl: newImageUrl
    })
 
    await showImage.save()
    
  }


 

  

  const updatedImage = ShowImage.findByPk(req.params.imageId)

  return res.status(200).json(updatedImage)
 })

module.exports = router;
