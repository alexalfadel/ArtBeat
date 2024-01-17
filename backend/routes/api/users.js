const express = require('express')
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    check('name')
      .exists({ checkFalsy: true })
      .isLength({ min: 3 })
      .withMessage('Name must be 3 characters or more.'),
    check('location')
      .exists({ checkFalsy: true })
      .withMessage('Location is required'),
    handleValidationErrors
  ];

// Sign up
router.post(
    '/',
    validateSignup,
    async (req, res) => {
      const { email, password, username, name, bio, location, profilePic } = req.body;
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({ email, username, hashedPassword, name, bio, location, profilePic });
  
      const safeUser = {
        id: user.id,
        email: user.email,
        username: user.username,
        name: user.name,
        bio: user.bio,
        location: user.location,
        profilePic: user.profilePic
      };
  
      await setTokenCookie(res, safeUser);
  
      return res.json({
        user: safeUser
      });
    }
  );

  router.get('/', async (req, res) => {
    const users = await User.findAll();
    return res.status(200).json({ artists: users })
  })

  router.get('/:userId', async (req, res) => {
    const user = await User.findByPk(req.params.userId)
    if (!user) return res.status(404).json({message: 'User does not exist'})

    return res.status(200).json({user: user})
  })

  router.put('/:userId', requireAuth, async (req, res) => {
    const user = await User.findByPk(req.params.userId)
    if (!user) return res.status(404).json({message: 'User does not exist'})

    const updatedUser = req.body
    console.log(updatedUser, '---updatedUser in backend')

    await user.set(updatedUser)

    await user.save()

    const savedUser = await User.findByPk(req.params.userId)

    return res.status(200).json(savedUser)

    

  })

module.exports = router;