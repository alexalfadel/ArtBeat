const express = require('express')
const Sequelize = require('sequelize');
const { Show, ShowImage, User, Rsvp, Comment } = require('../../db/models')
const { requireAuth } = require('../../utils/auth')
const Op = Sequelize;


const router = express.Router()

router.get('/:showId/preview', requireAuth, async (req, res) => {
    const previewImage = await ShowImage.findAll({
        where: {
            showId: req.params.showId,
            preview: true
        }
    })

    if (!previewImage) return res.status(404).json('No preview image')

    return res.status(200).json({ previewImage: previewImage })
} )

router.get('/', async (req, res) => {
    const today = new Date()
    const allShows = await Show.findAll({
        include: [
            {
                model: ShowImage
            },
            {
                model: User
            },
            {
                model: Rsvp
            },
            {
                model: Comment
            }
        ],
        order: [
            ['createdAt', 'ASC']
        ]
    })
    const upcomingShows = allShows.filter((show) => new Date(show.date) > today)
    return res.status(200).json(upcomingShows)
})

module.exports = router