'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
        name: 'Demo Lition',
        location: 'San Francisco',
        profilePic: 'https://faces3.b-cdn.net/Egypt.png',
        bio: 'Demo user account.'
      },
      {
        email: 'demo@demo.io',
        username: 'demouser',
        hashedPassword: bcrypt.hashSync('password'),
        name: 'Demo User',
        location: 'Austin',
        profilePic: 'https://faces3.b-cdn.net/England.png',
        bio: 'Demo user account.'
      },
      {
        email: 'jack@demo.io',
        username: 'jackcol',
        hashedPassword: bcrypt.hashSync('password'),
        name: 'Jack Collins',
        location: 'Los Angeles',
        profilePic: 'https://boredhumans.com/faces2/663.jpg',
        bio: "Meet Jack, the visionary LA street artist, weaving urban tales with vibrant hues. Jack's graffiti, a fusion of culture and rebellion, transcends boundaries. A maestro of the streets, his art whispers, roars, and leaves a mark on the city of angels."
      },
      {
        email: 'langley@demo.io',
        username: 'langley',
        hashedPassword: bcrypt.hashSync('password'),
        name: 'Langley Smith',
        location: 'San Francisco',
        profilePic: 'https://faces3.b-cdn.net/Ukraine.png',
        bio: "Introducing Langley, the SF-based fine artist whose creations breathe life into canvases. With a palette that mirrors the city's diversity, she crafts emotive masterpieces. Her work transcends the canvas, offering viewers a journey through the soul of SF."
      },
      {
        email: 'harper@demo.io',
        username: 'harper',
        hashedPassword: bcrypt.hashSync('password'),
        name: 'Harper Jackson',
        location: 'Austin',
        profilePic: 'https://faces3.b-cdn.net/Thailand.png',
        bio: "Meet Harper, the ceramic virtuoso. Molding clay into poetic forms, her creations blend tradition with modernity. Harper's art, a dance of earth and imagination, breathes life into functional masterpieces that resonate with the vibrant spirit of Austin."
      },
    ], { validate: true})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'demouser', 'jackcol', 'langley', 'harper'] }
    }, {});
  }
};
