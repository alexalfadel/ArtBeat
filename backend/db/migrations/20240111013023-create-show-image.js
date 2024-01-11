'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ShowImages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      imageUrl: {
        type: Sequelize.STRING(300),
        allowNull: false
      },
      description: {
        type: Sequelize.STRING(256)
      },
      preview: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      showId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Shows' }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    }, options);
  },
  async down(queryInterface, Sequelize) {
    options.tableName='ShowImages'
    return queryInterface.dropTable('ShowImages');
  }
};