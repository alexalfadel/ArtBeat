const express = require("express");
const Sequelize = require("sequelize");
const { Show, ShowImage, User, Rsvp } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const Op = Sequelize;

const router = express.Router();

router.post("/", requireAuth, async (req, res) => {
  const newImage = await ShowImage.create(req.body);
  return res.status(201).json(newImage);
});

router.put('/:imageId', requireAuth, async (req, res) => {
  const image = await ShowImage.findByPk(req.params.imageId)
  if (!image) return res.status(404).json({message: 'Image does not exist'})

  await image.set(req.body)

  await image.save()

  const updatedImage = ShowImage.findByPk(req.params.imageId)

  return res.status(200).json(updatedImage)
 })

module.exports = router;
