const express = require('express')
const Sequelize = require('sequelize');
const { Show, ShowImage, User, Rsvp, Comment } = require('../../db/models')
const { requireAuth } = require('../../utils/auth')
const Op = Sequelize;


const router = express.Router()

router.post('/', async (req, res) => {
    const { userId, showId, text } = req.body
    const show = Show.findByPk(showId)

    if (!show) return res.status(404).json({message: "Show does not exist"})

    const comment = await Comment.create({
        userId: userId,
        showId: showId,
        text: text
    })


    return res.status(200).json(comment)
})

router.delete('/:commentId', requireAuth, async (req, res) => {
    const comment = await Comment.findByPk(req.params.commentId)
    const user = req.user


    if (!comment) return res.status(404).json({message: 'Comment does not exist'})
    if (comment.userId !== user.id) return res.status(403).json({message: 'You must own the comment to delete it'})
    
    await comment.destroy()

    return res.status(200).json({
        message: 'Successfully Deleted'
    })

})

router.put('/:commentId', requireAuth, async (req, res) => {
    const comment = await Comment.findByPk(req.params.commentId)
    const user = req.user

    if (!comment) return res.status(404).json({message: 'Comment does not exist'})
    if (comment.userId !== user.id) return res.status(403).json({message: 'You must own the comment to update it'})

    await comment.set({
        id: req.params.commentId,
        userId: req.body.userId,
        text: req.body.text
    })

    await comment.save()

    const updatedComment = await Comment.findByPk(req.params.commentId)

    return res.status(200).json(updatedComment)

})

module.exports = router