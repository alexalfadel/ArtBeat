const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const showsRouter = require('./shows.js')
const rsvpRouter = require('./rsvp.js')
const { restoreUser } = require('../../utils/auth.js');

router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/shows', showsRouter)

router.use('/rsvp', rsvpRouter)

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});


module.exports = router;