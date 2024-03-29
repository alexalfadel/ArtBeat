const express = require("express");
const Sequelize = require("sequelize");
const { Show, ShowImage, User, Rsvp } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const Op = Sequelize;
const { v4: uuidv4 } = require("uuid");

const { singleFileUpload, singleMulterUpload } = require("../../awsS3");

const router = express.Router();

router.post("/addProfilePic", singleMulterUpload("image"), async (req, res) => {
  const imageUrl = await singleFileUpload({ file: req.file, public: true });
  return res.status(201).json(imageUrl);
});

router.post(
  "/upload",
  singleMulterUpload("image"),
  requireAuth,
  async (req, res) => {
    const { title, description, preview, showId } = req.body;
    const imageURL = await singleFileUpload({ file: req.file, public: true });
    const newImage = await ShowImage.create({
      title: title,
      description: description,
      imageUrl: imageURL,
      preview: preview,
      showId: showId,
    });

    return res.status(201).json(newImage);
  }
);

router.post("/", requireAuth, async (req, res) => {
  const newImage = await ShowImage.create(req.body);
  return res.status(201).json(newImage);
});

router.put(
  "/:imageId/url",
  singleMulterUpload("image"),
  requireAuth,
  async (req, res) => {
    const { id } = req.body;
    const newImageUrl = await singleFileUpload({
      file: req.file,
      public: true,
    });
    return res.status(200).json(newImageUrl);
  }
);

router.put("/:imageId", requireAuth, async (req, res) => {
  const { title, description, preview, showId, imageUrl } = req.body;
  const showImage = await ShowImage.findByPk(req.params.imageId);

  if (!showImage)
    return res.status(404).json({ message: "Image does not exist" });
  const user = req.user;
  const userShows = await Show.findAll({
    where: {
      userId: user.id,
    },
  });
  const imageShow = userShows.filter((show) => show.id === showImage.showId);
  if (!imageShow)
    return res
      .status(403)
      .json({ message: "You must own the image to update it" });

  await showImage.set({
    title: title,
    description: description,
    preview: preview,
    showId: showId,
    imageUrl: imageUrl,
  });

  await showImage.save();

  const updatedImage = ShowImage.findByPk(req.params.imageId);

  return res.status(200).json(updatedImage);
});

router.delete("/:imageId", requireAuth, async (req, res) => {
  const image = await ShowImage.findByPk(req.params.imageId);
  const user = req.user;

  if (!image) return res.status(404).json({ message: "Image does not exist" });
  const show = await Show.findByPk(image.showId);

  if (user.id !== show.userId) {
    return res
      .status(403)
      .json({ message: "You must own an image to delete it" });
  }

  await image.destroy();

  return res.status(200).json({ message: "Successfuly Deleted" });
});

module.exports = router;
