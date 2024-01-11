'use strict';
const { Comment } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Comment.bulkCreate([
      {
        text: 'Will there be an open bar?',
        showId: 1,
        userId: 2
      },
      {
        text: "Can't wait!",
        showId: 1,
        userId: 3
      },
      {
        text: 'Is this in a warehouse?',
        showId: 2,
        userId: 1
      },
      {
        text: 'This artist is one of my favorites!',
        showId: 2,
        userId: 3
      },
      {
        text: 'Can I bring my dog?',
        showId: 3,
        userId: 1
      },
      {
        text: 'This show is going to be great.',
        showId: 3,
        userId: 2
      }
    ], { validate: true})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Comments'
    const Op = Sequelize.Op
    return queryInterface.bulkDelete(options, {
      text: { [Op.in]: ['This show is going to be great.', 'Can I bring my dog?', 'This artist is one of my favorites!', 'Is this in a warehouse?', "Can't wait!", 'Will there be an open bar?']}
    }, {})
  }
};
