const express = require("express");
const Sequelize = require("sequelize");
const { Show, ShowImage, User, Rsvp, Comment } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const Op = Sequelize;

const router = express.Router();

router.get("/:showId/preview", requireAuth, async (req, res) => {
  const previewImage = await ShowImage.findAll({
    where: {
      showId: req.params.showId,
      preview: true,
    },
  });

  if (!previewImage) return res.status(404).json("No preview image");

  return res.status(200).json({ previewImage: previewImage });
});

router.get("/", async (req, res) => {
  const today = new Date();
  const allShows = await Show.findAll({
    include: [
      {
        model: ShowImage,
      },
      {
        model: User,
      },
      {
        model: Rsvp,
      },
      {
        model: Comment,
      },
    ],
    order: [["createdAt", "ASC"]],
  });
  const upcomingShows = allShows.filter((show) => new Date(show.date) > today);
  return res.status(200).json(upcomingShows);
});

router.delete("/:showId", requireAuth, async (req, res) => {
  const show = await Show.findByPk(req.params.showId);
  const user = req.user;

  if (!show) return res.status(404).json({ message: "Show does not exist" });
  if (show.userId !== req.user.id)
    return res
      .status(403)
      .json({ message: "You must own the show to delete it" });

  await show.destroy();

  return res.status(200).json({ message: "Successfuly deleted." });
});

router.post("/", requireAuth, async (req, res) => {
  const show = req.body;
  const newShow = await Show.create(show);
  return res.status(201).json(newShow);
});

router.put('/:showId', requireAuth, async (req, res) => {
  const show = req.body
  const user = req.user
  const originalShow = await Show.findByPk(req.params.showId)
  if (!originalShow) return res.status(404).json({ message: 'Show does not exist'})
  if (originalShow.userId !== user.id) return res.status(403).json({message: "You must own the show to update it."})

  await originalShow.set(show)

  await originalShow.save()

  const updatedShow = Show.findByPk(req.params.showId)

  return res.status(200).json(updatedShow)
})

module.exports = router;
