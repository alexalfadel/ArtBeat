'use strict';

const { Show } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Show.bulkCreate([
      {
        name: 'LA Street Art Exhibit',
        description: 'Dive into the urban tapestry at the LA Street Art Exhibit featuring Jack Collins. His work pulsates with raw energy, telling vivid tales on city walls. A collision of color and culture awaits!',
        location: 'Los Angeles',
        address: '67 N Hollywood Way, Burbank, CA, 91505',
        time: '19:00',
        date: '2024-06-10',
        price: 10,
        userId: '3'
      },
      {
        name: 'Celestial Visions: A Fine Art Odyssey',
        description: "Step into 'Celestial Visions,' where art transcends boundaries. This fine art odyssey unveils ethereal masterpieces, blending imagination and emotion in every stroke",
        location: 'San Francisco',
        address: '45 Fillmore, San Francisco, CA, 94117',
        time: '20:00',
        date: '2024-06-17',
        price: 50,
        userId: '4'
      },
      {
        name: 'Earthly Elegance: A Ceramics Showcase',
        description: "Immerse in 'Earthly Elegance,' a ceramics showcase where tactile wonders come to life. Each piece narrates a story of craftsmanship and beauty, inviting you into a world of clay-inspired enchantment",
        location: 'Austin',
        address: '10415 Catherine Dr, Austin, TX, 78724',
        time: '18:00',
        date: '2024-06-22',
        price: 150,
        userId: '5'
      }
    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Shows'
    const Op = Sequelize.Op
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['LA Street Art Exhibit', 'Celestial Visions: A Fine Art Odyssey', 'Earthly Elegance: A Ceramics Showcase']}
    }, {})
  }
};
