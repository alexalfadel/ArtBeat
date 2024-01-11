const express = require('express')
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

// Sign up
router.post(
    '/',
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

module.exports = router;