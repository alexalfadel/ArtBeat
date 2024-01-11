'use strict';

const { Rsvp } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Rsvp.bulkCreate([
      {
        showId: 1,
        userId: 4
      },
      {
        showId: 1,
        userId: 5
      },
      {
        showId: 2,
        userId: 3
      },
      {
        showId: 2,
        userId: 5
      },
      {
        showId: 3,
        userId: 3
      },
      {
        showId: 3,
        userId: 4
      }
    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName='Rsvps';
    const Op = Sequelize.Op
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [3, 4, 5]}
    }, {})
  }
};
