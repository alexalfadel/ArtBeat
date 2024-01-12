const express = require('express')
const Sequelize = require('sequelize');
const { Show, ShowImage, User, Rsvp } = require('../../db/models')
const { requireAuth } = require('../../utils/auth')
const Op = Sequelize;


const router = express.Router()

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