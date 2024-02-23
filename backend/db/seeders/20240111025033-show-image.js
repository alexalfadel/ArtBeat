'use strict';

const { ShowImage } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await ShowImage.bulkCreate([
      {
        title: 'Urban Harmony',
        imageUrl: 'https://artbeat-media.s3.us-west-1.amazonaws.com/public/Screenshot+2024-02-23+at+2.53.25+PM.png',
        description: 'A street art piece that intertwines vibrant colors and dynamic shapes, echoing the rhythm of city life in a visual symphony.',
        preview: true,
        showId: 1
      },
      {
        title: 'Concrete Dreams',
        imageUrl: 'https://artbeat-media.s3.us-west-1.amazonaws.com/public/Screenshot+2024-02-23+at+2.53.19+PM.png',
        description: 'This piece transforms cold concrete into a dreamscape, where surreal imagery and bold strokes collide, blurring the line between reality and imagination.',
        preview: false,
        showId: 1
      },
      {
        title: 'Graffiti Symphony',
        imageUrl: 'https://artbeat-media.s3.us-west-1.amazonaws.com/public/Screenshot+2024-02-23+at+2.53.06+PM.png',
        description: 'An explosive mural of street poetry, where spray-painted notes dance on the walls, creating a symphony of urban expression and vibrant chaos.',
        preview: false,
        showId: 1
      },
      {
        title: 'Stellar Serenity',
        imageUrl: 'https://artbeat-media.s3.us-west-1.amazonaws.com/public/Screenshot+2024-02-23+at+2.56.13+PM.png',
        description: 'A celestial masterpiece capturing the tranquility of distant stars, painted with delicate strokes that mirror the serenity of the cosmic expanse.',
        preview: true,
        showId: 2
      },
      {
        title: 'Cosmic Elegance',
        imageUrl: 'https://artbeat-media.s3.us-west-1.amazonaws.com/public/Screenshot+2024-02-23+at+2.56.19+PM.png',
        description: 'This fine art piece blends celestial hues with graceful lines, evoking a sense of celestial beauty and elegance that transcends the boundaries of the universe.',
        preview: false,
        showId: 2
      },
      {
        title: 'Nebula Whispers',
        imageUrl: 'https://artbeat-media.s3.us-west-1.amazonaws.com/public/Screenshot+2024-02-23+at+2.56.24+PM.png',
        description: 'A mesmerizing artwork where vibrant nebulae seem to whisper secrets of the cosmos, inviting viewers into a cosmic ballet of colors and ethereal mysteries.',
        preview: false,
        showId: 2
      },
      {
        title: 'Clay Whispers',
        imageUrl: 'https://artbeat-media.s3.us-west-1.amazonaws.com/public/Screenshot+2024-02-23+at+2.57.55+PM.png',
        description: "A ceramic marvel, whispering tales of craftsmanship, each curve and contour echoing the secrets woven into the clay's embrace.",
        preview: true,
        showId: 3
      },
      {
        title: 'Earthen Embrace',
        imageUrl: 'https://artbeat-media.s3.us-west-1.amazonaws.com/public/Screenshot+2024-02-23+at+2.58.07+PM.png',
        description: "This ceramic masterpiece cradles the essence of earth, a tactile embrace that melds form and function into an intimate dance of artistry.",
        preview: false,
        showId: 3
      },
      {
        title: 'Sculpted Serenity',
        imageUrl: 'https://artbeat-media.s3.us-west-1.amazonaws.com/public/Screenshot+2024-02-23+at+2.58.19+PM.png',
        description: "Tranquil and refined, this ceramic creation weaves serenity through sculpted lines, offering a serene aesthetic journey in the hands of the artist.",
        preview: false,
        showId: 3
      },
    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ShowImages'
    const Op = Sequelize.Op
    return queryInterface.bulkDelete(options, {
      title: { [Op.in]: ['Urban Harmony', 'Concrete Dreams', 'Graffiti Symphony', 'Stellar Serenity', 'Cosmic Elegance', 'Nebula Whispers', 'Clay Whispers', 'Earthen Embrace', 'Sculpted Serenity']}
    }, {})
  }
};
