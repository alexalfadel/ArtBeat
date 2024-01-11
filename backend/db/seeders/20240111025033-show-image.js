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
        imageUrl: 'https://imgproxy.urbaneez.art/insecure/rs:fit:1500:0/plain/https://urbaneez.s3.eu-central-1.amazonaws.com/cover_techniques_street_art_2.jpg',
        description: 'A street art piece that intertwines vibrant colors and dynamic shapes, echoing the rhythm of city life in a visual symphony.',
        preview: true,
        showId: 1
      },
      {
        title: 'Concrete Dreams',
        imageUrl: 'https://magazine.artland.com/wp-content/uploads/2022/01/Berlin-Wall-Street-Art-Kota-Ezawa-1024x763-1.jpg',
        description: 'This piece transforms cold concrete into a dreamscape, where surreal imagery and bold strokes collide, blurring the line between reality and imagination.',
        preview: false,
        showId: 1
      },
      {
        title: 'Graffiti Symphony',
        imageUrl: 'https://static.standard.co.uk/s3fs-public/thumbnails/image/2017/01/11/12/globalstreetart1101b.jpg',
        description: 'An explosive mural of street poetry, where spray-painted notes dance on the walls, creating a symphony of urban expression and vibrant chaos.',
        preview: false,
        showId: 1
      },
      {
        title: 'Stellar Serenity',
        imageUrl: 'https://images.squarespace-cdn.com/content/v1/55035660e4b0c3c9c4c061a9/1683218762404-VVDM1FBJ08RCP703O20S/14-210+Janis+Loverin+%2522Celestial+Diva%2522+%242875.jpg',
        description: 'A celestial masterpiece capturing the tranquility of distant stars, painted with delicate strokes that mirror the serenity of the cosmic expanse.',
        preview: true,
        showId: 2
      },
      {
        title: 'Cosmic Elegance',
        imageUrl: 'https://images.squarespace-cdn.com/content/v1/56608d9de4b03f54f2820cff/1632254567850-KOC8E3BIACD4ZZ9MKTP0/Moon+and+clouds+at+dusk_WEB.jpg',
        description: 'This fine art piece blends celestial hues with graceful lines, evoking a sense of celestial beauty and elegance that transcends the boundaries of the universe.',
        preview: false,
        showId: 2
      },
      {
        title: 'Nebula Whispers',
        imageUrl: 'https://images.squarespace-cdn.com/content/v1/5c2f7f8e2971143d628136a8/1690656762433-2Q0WFYEDGNQ6SHLWD3I5/Celestial.+Full+View..jpeg',
        description: 'A mesmerizing artwork where vibrant nebulae seem to whisper secrets of the cosmos, inviting viewers into a cosmic ballet of colors and ethereal mysteries.',
        preview: false,
        showId: 2
      },
      {
        title: 'Clay Whispers',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Wave_bowl_MET_LC-2001_549-001_%28cropped%29.jpg',
        description: "A ceramic marvel, whispering tales of craftsmanship, each curve and contour echoing the secrets woven into the clay's embrace.",
        preview: true,
        showId: 3
      },
      {
        title: 'Earthen Embrace',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Vase_%28France%29%2C_ca._1900_%28CH_18666929%29_%28cropped%29.jpg',
        description: "This ceramic masterpiece cradles the essence of earth, a tactile embrace that melds form and function into an intimate dance of artistry.",
        preview: false,
        showId: 3
      },
      {
        title: 'Sculpted Serenity',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/Wedgwood-Ghostly-Wood-Rau_%28cropped%29.jpg',
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
