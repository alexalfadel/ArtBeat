const express = require("express");
const Sequelize = require("sequelize");
const { Show, ShowImage, User, Rsvp } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const Op = Sequelize;

const router = express.Router();

router.post("/", requireAuth, async (req, res) => {
  const { userId, showId } = req.body;
  const show = await Show.findByPk(showId);

  if (!show) return res.status(400).json({ message: "Show does not exist" });

  const rsvp = await Rsvp.findAll({
    where: {
      userId: userId,
      showId: showId,
    },
  });

  if (rsvp.length !== 0)
    return res
      .status(400)
      .json({ message: "User is already RSVP'd to this show." });
  if (show.userId === userId)
    return res
      .status(403)
      .json({ message: "User cannot RSVP to their own show." });
  const newRsvp = await Rsvp.create({
    showId: showId,
    userId: userId,
  });

  return res.status(200).json(newRsvp);
});

router.delete("/:rsvpId", requireAuth, async (req, res) => {
  const id = req.params.rsvpId;
  const userId = req.user.id;
  const rsvp = await Rsvp.findByPk(id);

  if (!rsvp)
    return res.status(404).json({ message: "RSVP could not be found" });
  else if (rsvp.userId !== userId)
    return res
      .status(404)
      .json({ message: "You must own the RSVP to delete it" });

  await rsvp.destroy();

  return res.status(200).json({
    message: "Successfully Deleted",
  });
});

module.exports = router;
