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

module.exports = router;
